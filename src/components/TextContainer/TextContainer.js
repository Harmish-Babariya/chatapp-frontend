import React from 'react';

const TextContainer = ({ users }) => {
  return (
      <div>
              {users.map((user) => {
                  <p>{user}</p>
              })}
      </div>
  )
}

export default TextContainer;

