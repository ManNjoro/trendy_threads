import React from 'react'
import { useRouteError } from 'react-router-dom'

// AYPVVS3Wu8Ipzf0fZEmYfXBAqb4I1QxVKWck_QfFWC1LE-JgjTGZ9k33kLkGAat6hADuH644sVvDJE4D

export default function Error() {
    const error = useRouteError()
  return (
    <div>
        <h1>{error.message}</h1>
        <pre>{error.status} - {error.statusText}</pre>
    </div>
  )
}
