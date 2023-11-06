const React = require('react')
const Default = require('./layouts/default.jsx')

// function Index() {
//   return (
//     <Default>
//       <h2>Index Page</h2>
//     </Default>
//   )
// }

function Index({ breads, bakers, title }) {
  return (
    <Default title={title}>
      <h2>Index Page</h2>
      <h3>Bakers</h3>
      {/* <p>I have {breads[0].name} bread!</p> */}
      {/* This is a JSX comment. */}
      <ul>
        {bakers.map((baker) => {
          return (
            <li key={baker.id}>
              <a href={`/bakers/${baker._id}`}>{baker.name}</a>
            </li>
          )
        })}
      </ul>
      <h3>Breads</h3>
      <ul>
        {breads.map((bread, index) => {
          return (
            <li key={index}>
              {/* <a href={`/breads/${index}`}>{bread.name}</a> */}
              <a href={`/breads/${bread._id}`}>{bread.name}</a>
              {/* <p>{bread.getBakedBy()}</p> */}
            </li>
          )
        })}
      </ul>
      {/* ADD NEW */}
      <div className="newButton">
        <a href="./breads/new">
          <button>Add a new bread</button>
        </a>
      </div>
    </Default>
  )
}

module.exports = Index
