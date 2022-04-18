import React from 'react'

import ReactDOM from 'react-dom';
import logo from './criugm-logo.png'
import ProgramSummary from './ProgramSummary';
import Utils from './utils/programs'

class Authenticate extends React.Component {
    
        constructor(props) {
            super(props);
            this.state = {code: ''};
        
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
          }
        
          handleChange(event) {
            this.setState({code: event.target.value});
          }
        
          handleSubmit(event) {
           
            const enrollmentCode = this.state.code

            Utils.program_header(enrollmentCode, (result) => {
              console.log('Inside authenticate, result is: ', result)
              const enrollment_record = JSON.stringify(result)
//              const enrollment_record = result
              console.log('Here is the enrollment record: ' + enrollment_record)
              ReactDOM.render(
                <React.StrictMode>
                  <ProgramSummary enrollment_record={enrollment_record} />
                </React.StrictMode>,
                document.getElementById('root')
              );
            })
            event.preventDefault();
          }

          render() {
    
            return (
            <form onSubmit={this.handleSubmit}>
                <img alt="CRIUGM" src={logo}/>
                <br></br>
                <h4>Registration</h4>
                <br></br>
                <input type="text" name="code" id="code" value={this.state.code} onChange={this.handleChange}/>
                <br></br>
                <input type="submit" value="Submit"/>
            </form>
            )
        }
    }
    
export default Authenticate