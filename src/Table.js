import React from "react";
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: this.props.data,//props.Users,
      MasterChecked: false,
      SelectedList: [],
      SingleSelect: false,
      MultiSelect: false,
      sortOrder: 'ASC'
    };
  }

  // Select/ UnSelect Table rows
  onMasterCheck(e) {
    let tempList = this.state.List;
    // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = e.target.checked));
    

    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
      MultiSelect: true,
      SingleSelect: false
    });
  }

  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    this.setState({MultiSelect: e.target.checked});
    let tempList = this.state.List;
    tempList.map((user) => {
      if (user.id === item.id) {
        user.selected = e.target.checked;        
      } 
      return user;
    });
        
    const totalItems = this.state.List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;
      
    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
      MultiSelect: e.target.checked,
      SingleSelect: false
    });
  }

  onSingleItemCheck(e, item) {
    this.setState({
      SelectedList: []
    });
   let tempList = this.state.List;
    tempList.map((user) => {
      if (user.id === item.id) {
        user.selected = e.target.checked;        
      } else {
        user.selected = false; 
      }
      return user;
    });
            
    // Update State
    this.setState({
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
      MultiSelect: false,
      SingleSelect: e.target.checked,
      MasterChecked: false
    });
  }
     
  sortColumn(item, order) {    
    if(order === 'ASC') {
      this.setState ({sortOrder: 'DESC'})
      this.state.List.sort( function(a,b){
        if ( a[item] < b[item] ){
          return -1;
        } else return 0
      });
     } else {
      this.setState ({sortOrder: 'ASC'})
      this.state.List.sort( function(a,b){
        if ( a[item] > b[item] ){
          return -1;
        } else return 0
      });
    }
   
  }

  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered table-sortable">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterChecked}
                      id="mastercheck"
                      data-testid="multiple-checkbox"
                      onChange={(e) => this.onMasterCheck(e)}
                    />
                  </th>
                  <th scope="col"></th>
                  <th scope="col"  onClick={() => this.sortColumn('name', this.state.sortOrder)}>Name 
                  <i className="fa fa-fw fa-sort"></i></th>
                  <th scope="col"  onClick={() => this.sortColumn('email', this.state.sortOrder)}>Email <i className="fa fa-fw fa-sort"></i></th>
                  <th scope="col"  onClick={() => this.sortColumn('phone', this.state.sortOrder)}>Phone <i className="fa fa-fw fa-sort"></i></th>
                  <th scope="col"  onClick={() => this.sortColumn('website', this.state.sortOrder)}>Website <i className="fa fa-fw fa-sort"></i></th>
                </tr>
              </thead>
              <tbody>             
                {this.state.List.length >0 ? this.state.List.map((user) => (
                  <tr key={user.id} className={user.selected ? "selected" : ""}>
                    <th scope="row">
                      <input
                        type="checkbox"
                        checked={this.state.MultiSelect ? user.selected : ""}
                        className="form-check-input"
                        id="rowcheck{user.id}"
                        data-testid="rowcheck{user.id}"
                        onChange={(e) => this.onItemCheck(e, user)}
                      />
                    </th>
                    <th scope="row">
                      <input
                        type="radio"
                        checked={this.state.SingleSelect ? user.selected : ""}
                        className="form-check-input"
                        id="singlerowcheck{user.id}"
                        data-testid="radio-button"
                        onChange={(e) => this.onSingleItemCheck(e, user)}
                      />
                    </th>
                    <td>{user.name ? user.name : "--"}</td>
                    <td>{user.email ? user.email : "--"}</td>
                    <td>{user.phone ? user.email : "--"}</td>
                    <td>{user.website ? user.website : "--"}</td>
                  </tr>
                )): <tr><td colSpan={4}>No records found!</td></tr>}
              </tbody>
            </table>
            <div className="row">
              <h2 data-testid="content">Get Selected Items :</h2>
              <code data-testid="multiple count">{this.state.SelectedList.length} </code>
            </div>       
            <div className="row">
              <h2 data-testid="content rows">Selected Row Item(s) :</h2>
              <code>{JSON.stringify(this.state.SelectedList)}</code>
            </div>
          </div>
        </div>
      </div>
    );
  }
}




export default Table;