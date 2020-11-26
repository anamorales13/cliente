import React, {Component} from 'react';
//import Calendar from 'react-calendar';

class Sidebar extends Component{

    render(){
        return(

            <aside id="sidebar">
            <div id="nav-blog" className="sidebar-item">
              {/*  <Calendar className="calendario"/>*/}
               {/*<Calendar date={moment("19/10/2019", "DD/MM/YYYY")} onSelect={this.onSelect}/>*/}
            </div>

          
        </aside>
        );
    }
}

export default Sidebar;