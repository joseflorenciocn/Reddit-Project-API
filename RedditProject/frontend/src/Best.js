import React, { Component } from 'react';
import MainContainer from './MainContainer';
import moment from 'moment';
import axios from 'axios';

class Best extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reddit: [],
            userName_post: this.props.username,
            title_post: "",
            permalink_post: "", 
            created_post: 0,
            category_temp: "Best"
      }

      this.handleClick = this.handleClick.bind(this);
    }
    
      componentDidMount() {
          axios.get("https://www.reddit.com/best.json")
          .then(res => {
            console.log(this.state.userName_post);
            const reddit = res.data.data.children;
            this.setState({ reddit });
          })

      }

    handleClick = (param) => (e) => { 

        if(this.state.userName_post.length === 0) console.log("User not logged");
        else {
    
        this.setState({
            title_post: param.data.title,
            permalink_post: param.data.permalink,
            created_post: param.data.created 
            }, () => {

            axios.post("/addinfo", {

            userName: this.state.userName_post,
            title: this.state.title_post,
            permalink: this.state.permalink_post,
            created: this.state.created_post,
            categ: this.state.category_temp
 
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
        }  
        );
    }
}

  render() {
    return (
        <div>
            <MainContainer sidebar = "Best" name = {this.props.username} >
                <h1 className="page-header">Best Posts</h1>
                <table className="table table-striped table-bordered">
                    <tbody>
                         <tr>
                            <td><b>Post</b></td>
                            <td><b>Created</b></td>
                            {this.state.userName_post ? <td><b>Like</b></td> : console.log("not logged")}
                        </tr>

                        {this.state.reddit.map(red =>
                        <tr>                            
                            <td><a href={"http://www.reddit.com" + red.data.permalink}>{red.data.title}</a></td>
                            <td>{moment.unix(red.data.created).utcOffset(-720).format("LLLL")}</td>
                            {this.state.userName_post ? <td><button onClick={this.handleClick(red)}>Like</button></td> : console.log("not logged")}
                        </tr>
                        )}
                    </tbody>
                </table>

            </ MainContainer>
        </div>

    );
  }
}

export default Best;