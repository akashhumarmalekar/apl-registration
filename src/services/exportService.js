// Export service: turns registration records into a downloadable .xlsx file.
// xlsx is dynamically imported so its (sizeable) parser/writer code only
// loads for admins who actually click "Export to Excel".

function formatTimestamp(date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

/**
 * Builds and downloads an .xlsx file from the given registrations,
 * newest-first, matching the columns required for the tournament desk.
 */
export async function exportRegistrationsToExcel(registrations, fileName = 'APL_Registrations.xlsx') {
  const XLSX = await import('xlsx');

  const rows = registrations.map((reg, index) => ({
    'Sr No': index + 1,
    'First Name': reg.firstName,
    'Last Name': reg.lastName,
    'Attribute': reg.attribute,
    'Contact Number': reg.contactNumber,
    'Registration Time': formatTimestamp(reg.registeredAt)
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [
    { wch: 8 },
    { wch: 18 },
    { wch: 18 },
    { wch: 14 },
    { wch: 16 },
    { wch: 22 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
  XLSX.writeFile(workbook, fileName);
}
