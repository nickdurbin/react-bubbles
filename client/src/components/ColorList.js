import React, { useState } from "react";
import { axiosWithAuth as axios } from '../utils/axiosAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, makeRefresh }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [errors, setErrors] = useState({
    color: '',
    code: {
      hex: ''
    },
    id: ''
  })
  
  const [newColor, setNewColor] = useState({
    color: '',
    code: {
      hex: ''
    },
    id: ''
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault()
    axios().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(makeRefresh())
			.then(result => {
        setEditing(false)
        console.log('Color was edited!')
			})
			.catch(error => {
				console.log(error)
			})
	}

  const deleteColor = color => {
    if (window.confirm('Are you sure you want to delete color?'))
    axios().delete(`/api/colors/${color.id}`)
      .then(makeRefresh())
      .then(res => {
        console.log('Color was deleted!')

      })
      .catch(err => {
        console.log(err, err.response)
      })
  };

  const addColor = e => {
    e.preventDefault();
    if (!newColor.color) {
      return setErrors({ ...errors, 
        name: 'Color cannot be blank!',
        code: {
          hex: 'Hex cannot be empty.',
        },
    })}
    axios()
      .post('/api/colors/', newColor)
      .then(makeRefresh())
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        return err.response
      })
    resetForm();
  }

  const resetForm = () => {
    setNewColor({
      name: '',
      code: {
        hex: '',
      },
    })
    setErrors({
      name: '',
      code: {
        hex: '',
      },
    })
  }

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
      <form onSubmit={addColor}>
        <h1>New Color</h1>
        <hr />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={newColor.color}
          onChange={(e) => setNewColor({ ...newColor, color: e.target.value })}
          required
        />
        
        <input
          type="text"
          name="hex"
          placeholder="Hex"
          value={newColor.code.hex}
          onChange={(e) => setNewColor({ ...newColor, code: { hex: e.target.value }})}
          required
        />
  
        <button className="addBtn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default ColorList;