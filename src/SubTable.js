import React, { Component } from 'react';

class SubTable extends Component {
  render() {
    return (
      <table>
      <tbody>{this.props.prices.sort(function(a, b) {
            return a.date.localeCompare(b.date);
        }).map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.date}</td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                  </tr>
                )
             })}</tbody>
       </table>
    )
  }
}

export default SubTable;
