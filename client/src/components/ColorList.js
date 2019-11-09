import React, { useState } from "react";
import { axiosWithAuth as axios } from '../utils/axiosAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [theColors, setTheColors] = useState([])
  console.log(theColors)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault()
		axios().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
			.then(result => {
        setEditing(false)
        console.log('Color was edited!')
			})
			.catch(error => {
				console.log(error)
			})
	}

  const deleteColor = id => {
    const color = colors.find(color => color.id === id)
    if (window.confirm('Are you sure you want to delete color?'))
    setTheColors(theColors.filter(color => color.id !== id))
    axios().delete(`/api/colors/${id}`)
      .then(res => {
        console.log('Color was deleted!')

      })
      .catch(err => {
        console.log(err, err.response)
        setTheColors([ ...theColors, color ])
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
