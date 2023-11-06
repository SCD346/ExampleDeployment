const React = require('react')
const Default = require('./layouts/default')

function FourOFour() {
  return (
    <Default>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>404 Not Found!</h1>
        <pre>
          {`
   _______
  /       \\
 /  O   O  \\
|    (_)    |
 \\   \\_/   /
  \\        /
   \\______/
          `}
        </pre>
        <h2>Oops! It looks like this page is lost in the void.</h2>
        <p>
          Don't worry; you can navigate back home using the navigation menu.
        </p>
      </div>
    </Default>
  )
}

module.exports = FourOFour
