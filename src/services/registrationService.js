// Registration service: all Supabase reads/writes for player registrations
// live here so components stay free of database-specific code.

import { supabase, REGISTRATIONS_TABLE } from '../supabase/config';

// Postgres error code for a unique-constraint violation (duplicate contact_number).
const UNIQUE_VIOLATION = '23505';

/**
 * Saves a new registration. Duplicate contact numbers are rejected atomically
 * by a unique constraint on the `contact_number` column in the database
 * (see schema.sql) — no separate read-then-write race condition.
 */
export async function createRegistration({ firstName, lastName, attribute, contactNumber }) {
  const { data, error } = await supabase
    .from(REGISTRATIONS_TABLE)
    .insert({
      first_name: firstName,
      last_name: lastName,
      attribute,
      contact_number: contactNumber
    })
    .select()
    .single();

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      throw new Error('This contact number is already registered for the tournament.');
    }
    throw new Error(error.message || 'Could not save your registration. Please try again.');
  }

  return data.id;
}

/** One-time fetch of all registrations, newest first. */
export async function fetchAllRegistrations() {
  const { data, error } = await supabase
    .from(REGISTRATIONS_TABLE)
    .select('*')
    .order('registered_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data.map(mapRow);
}

/**
 * Live subscription to the registrations table (newest first).
 * Supabase Realtime streams row-level change events; on any change we
 * simply refetch the full list, which keeps the admin table correct and
 * is plenty fast at single-event registration volumes.
 * Returns an unsubscribe function — call it on unmount.
 */
export function subscribeToRegistrations(onChange, onError) {
  let cancelled = false;

  const refresh = async () => {
    try {
      const rows = await fetchAllRegistrations();
      if (!cancelled) onChange(rows);
    } catch (err) {
      if (!cancelled) onError(err);
    }
  };

  refresh();

  const channel = supabase
    .channel('registrations-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: REGISTRATIONS_TABLE }, refresh)
    .subscribe();

  return () => {
    cancelled = true;
    supabase.removeChannel(channel);
  };
}

export async function deleteRegistration(id) {
  const { error } = await supabase.from(REGISTRATIONS_TABLE).delete().eq('id', id);
  if (error) throw new Error(error.message);
}

function mapRow(row) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    attribute: row.attribute,
    contactNumber: row.contact_number,
    registeredAt: row.registered_at ? new Date(row.registered_at) : null
  };
}
