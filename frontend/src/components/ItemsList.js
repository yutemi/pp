import React from 'react'
import {Link} from 'react-router-dom'

export const ItemsList = ({ items }) => {
  if (!items.length) {
    return <p className="center">Ссылок пока нет</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Оригинальная</th>
        <th>Сокращенная</th>
        <th>Открыть</th>
      </tr>
      </thead>

      <tbody>
      { items.map((item, index) => {
        return (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item.from}</td>
            <td>{item.to}</td>
            <td>
              <Link to={`/item/${item._id}`}>Открыть</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}
