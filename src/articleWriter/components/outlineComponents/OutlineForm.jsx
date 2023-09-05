// import react
import React from "react";
// use mui
import { Select, MenuItem, FormControl, InputLabel, TextField, Button } from '@mui/material';
import { useSelector } from "react-redux"; 
import {setList} from '../../../redux/combinedActions'
import { useDispatch } from "react-redux";
import Tooltip from '@mui/material/Tooltip';
import './OutlineForm.css'

export default function OutlineForm(props) {
    const [promptSelection, setPromptSelection] = React.useState('questions');
    const [inputValue, setInputValue] = React.useState('');
    const [showTooltip, setShowTooltip] = React.useState(false);

    const dispatch = useDispatch();
    // handle change of input state
    const handleChange = (event) => {
        setInputValue(event.target.value);
    }
    // Handle change of dropdown selection
    const handleDropdownChange = (event) => {
      setPromptSelection(event.target.value);
    }
    // Validate Prompt Input
    const validatePromptInput = () => {
      // check if input is between minimum and maximum number of characters
      if (inputValue.length < 1 || inputValue.length > 200) {
        setShowTooltip(true);
         // Hide the tooltip after 2 seconds
        setTimeout(() => {
          setShowTooltip(false);
        }, 2000);
        return
      }
      setShowTooltip(false);
      return null; // Indicates valid prompt
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      props.setIsSubLoading(true)
      if (validatePromptInput() === null) {
        // prepare data to send
        const dataToSend = {
            promptText: inputValue,
            promptType: promptSelection
        }
        const response = await fetch('/api/getCompletion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        const results = await response.json()
        // split results into list
        const resultList = results.response[0].split('\n')
        dispatch(setList(resultList))
        props.setIsSubLoading(false)
      }

    }    
  return (
    <div>
      <h1>Article Writer</h1>
      <form onSubmit={handleSubmit} className="prompt-form">
        <Tooltip title="Input is required" open={showTooltip}>
        <TextField className='outlineInputField' id="outlined-basic" label="Keyword" variant="outlined" onChange={handleChange} />
        </Tooltip>
        <FormControl>
          <InputLabel id="prompt-selection">Options</InputLabel>
          <Select
            labelId="prompt-selection"
            id="prompt-selection"
            value={promptSelection}
            label="Options"
            onChange={handleDropdownChange}
          >
            <MenuItem value="questions">Questions</MenuItem>
            <MenuItem value="mistakes">Mistakes</MenuItem>
            <MenuItem value="myths">Myths</MenuItem>
            <MenuItem value="facts">Facts</MenuItem>
            <MenuItem value="tips">Tips</MenuItem>
            <MenuItem value="benefits">Benefits</MenuItem> 
          </Select>         
        </FormControl>
        <Button variant="contained" type="submit" onSubmit={handleSubmit} disabled={props.isSubLoading}>Get Subheadings</Button>
      </form>
      <div className="prompt-results">

      </div>
      <div className="final-outline">

      </div>
    </div>
  );
}