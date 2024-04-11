export const subjectMedium=[ 
    {
    value: 'sinhala',
    label: 'Sinhala Medium',
  }
  ,  
  {
    value: 'english',
    label: 'English Medium',
  }
]

export const daysOfTheWeek=[ 
    {
    value: 'sunday',
    label: 'sunday',
  }
  ,  
  {
    value: 'monday',
    label: 'Monday',
  },
  {
    value: 'tuesday',
    label: 'Tuesday',
  },
  {
    value: 'wednesday',
    label: 'Wednesday',
  },
  {
    value: 'friday',
    label: 'friday',
  },
  {
    value: 'saturday',
    label: 'Saturday',
  }
]


export function getCurrentDateInSQLFormat() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}