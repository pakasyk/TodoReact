import React from 'react'

export default function Home() {
  return (
    <div className='jumbotron'>
       <h1 className="display-4">ToDo App!</h1>
        <p className="lead">This is a simple example of usecase React+Firebase.</p>
        <hr className="my-4" />
        <p>You can fasten your seatbelt and enjoy the speed of React.</p>
        <a className="btn btn-primary btn-lg" href="/todo" role="button">Explore the App!</a>
    </div>
  )
}
