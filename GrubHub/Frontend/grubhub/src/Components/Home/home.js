import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import pizzaImage from './cropped-2.jpg';
import searchIcon from './search.svg';
import { Modal,Button,InputGroup,FormControl, Alert } from 'react-bootstrap';

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '1550px'
};

const imageStyle = {
    width: '100px',
    height: '100px',
    marginTop: '5px'
}

const navStyle = {
    height : '60px'
};

const buttonStyle = {
    marginLeft: '910px',
    width : '200px'
}

const buttonStyle2 = {
    marginLeft: '50px',
    width : '200px'
}

const linkStyle = {
    color : '#FC8C8C'
}

const divStyle1 = {

}

const searchStyle = {
    width : '30px',
    marginLeft : '360px',
    marginTop : '-115px'
}

const inputStyle1 = {
    backgroundColor : '#FEFEFE',
    width : '600px',
    marginLeft : '400px',
    marginTop : '50px'
} 

const divStyle2 = {
    backgroundColor : '#FEFEFE',
    width : '250px',
    height : '275px',
    marginLeft : '0px',
    marginTop : '20px'
}

const divStyle5 = {
    backgroundColor : '#FEFEFE',
    width : '250px',
    height : '250px',
    marginLeft : '800px',
    marginTop : '20px'
}


const pStyle3 = {
    fontFamily : 'graphik',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '200px',
    marginTop : '50px'
}

const buttonStyle1 = {
    marginLeft : '1010px',
    marginTop : '-67px',
    width : '200px'
}

const divStyle3 = {
    fontFamily : 'graphik-sans',
    fontSize : '18px',
    fontWeight : '300',
    marginLeft : '30px',
    marginTop : '5px',
    color : '#A2AAAE'

}

const divStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '600',
    marginLeft : '30px',
    marginTop : '10px',
    paddingTop : '50px'
    
}

const pStyle4 = {
    marginLeft : '1020px',
    fontFamily : 'graphik',
    fontSize : '20px',
    fontWeight : '900',
    marginTop : '-580px'
}

const buttonStyle3 = {
    marginLeft : '30px',
    marginTop : '10px'

}

const modalStyle = {
    fontFamily : 'graphik'
}

const pStyle6 = {
    fontFamily : 'graphik-sans',
    fontSize : '19px',
    fontWeight : '900'
}

const pStyle7 = {
    fontFamily : 'graphik-sans',
    fontSize : '19px',
    fontWeight : '900'
}

const inputStyle9 = {
    marginTop : '-14px',
    marginBottom : '5px',
    width : '230px'
}

const inputStyle8 = {
    marginTop : '-14px',
    marginBottom : '5px',
    width : '230px'
}

const pStyle8 = {
    fontFamily : 'graphik-sans',
    fontSize : '19px',
    fontWeight : '900',
    marginLeft : '330px'
}

const inputStyle10 = {
    marginTop : '-14px',
    marginBottom : '5px',
    width : '230px',
    marginLeft : '230px'
}


class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchItem : "",
            errorMessage : "",
            items : [],
            orderid : "",
            orderTotalCost : "",
            restaurantName : "",
            firstName : "",
            lastName : "",
            delivered : [],
            setShow : false,
            setShowModal : false,
            receiver : "",
            message : "",
            alertShow : false,
            messages : [],
            replies : [],
            msgState : ""
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearchResults = this.handleSearchResults.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlesetModalShow = this.handlesetModalShow.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }

    componentDidMount() {
        console.log('Inside the recent order component did mount');
        const data = {
            orderTotalCost : sessionStorage.getItem('TotalwithTaxes'),
            restaurantName : localStorage.getItem('RestaurantNameForCustomer'),
            firstName : localStorage.getItem('FirstName'),
            lastName : localStorage.getItem('LastName'),
            fullName : localStorage.getItem('FirstName') + " " + localStorage.getItem('LastName')
        }
        console.log(data);
        axios.post('http://localhost:3001/Order/GetRecentOrderRequest',data,{
            headers : {
                Authorization : 'JWT ' + localStorage.getItem('Token')
            }
        })
        .then(response => {
            console.log(response.data);
            this.setState({
                items : response.data
            })
            console.log(this.state.items); 
        }).catch(err => {
            console.log(err);
        })

        console.log('past orders request');
        const data1 = {
            firstName : localStorage.getItem('FirstName'),
            lastName : localStorage.getItem('LastName')
        }

        console.log(data1);
        axios.post('http://localhost:3001/Order/GetDeliveredItems',data1,{
            headers : {
                Authorization : 'JWT ' + localStorage.getItem('Token')
            }
        })
        .then(response => {
            console.log(response.data)
            this.setState({
                delivered : response.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleLogout = () => {
        localStorage.removeItem('Cart');
        sessionStorage.removeItem('Total');
        sessionStorage.removeItem('Delivery Fee');
        sessionStorage.removeItem('Tip');
        sessionStorage.removeItem('Tax');
        window.localStorage.clear();
        cookie.remove('cookie',{ path : '/' });
    }

    handleClose = () => {
        this.setState({
            setShow : false,
            alertShow : false
        })
    }

    handleCloseModal = () => {
        this.setState({
            setShowModal : false,
            alertShow : false
        })
    }

    handleSearchResults = (e) => {
        e.preventDefault();
        console.log('inside handle search results');
        console.log(this.state.searchItem);
        if(this.state.searchItem == "") {
            this.setState({
                setShow : true
            })
        }
        else {
            sessionStorage.setItem('ItemToSearch',this.state.searchItem);
            this.props.history.push('/SearchResults');
        }
        /*const data = {
            searchItem : this.state.searchItem
        }
        console.log(data);
        axios.post("http://localhost:3001/home",data)
        .then(response => {
            console.log(response.data)
            if(response.status === 200) {
                console.log(response.data[0])
                sessionStorage.setItem('RestaurantName',response.data[0].RestaurantName);
                sessionStorage.setItem('ItemName',response.data[0].itemName);
                sessionStorage.setItem('ItemPrice',response.data[0].itemprice);
                this.props.history.push('/SearchResults');
            }
        })*/
        
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handlesetModalShow = (restName) => {
        this.setState({
            setShowModal : true
        })

        console.log('Inside handle received messages');
        const data = {
            restaurantName : restName
        }
        axios.post('http://localhost:3001/Message/ReceivedReply',data,{
            headers : {
                Authorization : 'JWT ' + localStorage.getItem('Token')
            }
        })
        .then(response => {
            console.log(response.data[0].message);
            this.setState({
                messages : response.data[0].message,
                replies : response.data[0].reply
            });
        }) 
        .catch(err => {
            console.log(err);
        })
    }

    handleMessage = (orderid) => {
        console.log('Inside message send post request');
        const data = {
            sender : localStorage.getItem('FirstName') + " " + localStorage.getItem('LastName'),
            receiver : this.state.receiver,
            date : new Date(),
            message : this.state.message,
            orderid : orderid
        }
        axios.post('http://localhost:3001/Message/SendMessage',data,{
            headers : {
                Authorization : 'JWT ' + localStorage.getItem('Token')
            }
        })
        .then(response => {
            console.log(response);
            this.setState({
                alertShow : true
            })
        })
        .catch(err => {
            console.log(err);
        })

    }

    render() {  
        const orderNameList = this.state.items.map((item) => (
            <div key = {item.orderid} style = {divStyle2}>
                <div style = {divStyle4}>{item.Status}</div>
                <div style = {divStyle3}>{item.ItemNames}</div>
                <div style = {divStyle3}>{item.RestaurantName}</div>
                <div style = {divStyle3}>{item.Total}</div>
                {localStorage.setItem('OrderId',item._id)}
                <button className = "btn btn-primary" style = {buttonStyle3} onClick = {this.handlesetModalShow.bind(this,item.RestaurantName)}>Message</button>
            </div>
        ));
        const deliveredList = this.state.delivered.map((delItem) => (
            <div key = {delItem.orderid} style = {divStyle5}>
                <div style = {divStyle4}>Delivered to you</div>
                <div style = {divStyle3}>{delItem.ItemNames}</div>
                <div style = {divStyle3}>{delItem.RestaurantName}</div>
                <div style = {divStyle3}>{delItem.Total}</div>
            </div>
        ));
        var replyReceived;
        
        var messagesReceived;
        if(this.state.messages != null) {
            messagesReceived = this.state.messages.map((msg,msgIndex) => (
                <div>
                    {msgIndex % 2 == 0 ? (
                        <div>
                            <p style = {pStyle8}>Your Message : </p>
                            <textarea className = "form-control" defaultValue = {msg} style = {inputStyle10}></textarea>
                        </div>
                    ) : (
                        <div>
                            <p style = {pStyle7}>Message : </p>
                            <textarea className = "form-control" defaultValue = {msg} style = {inputStyle8}></textarea>
                        </div>
                    )} 
                    {/*<p style = {pStyle6}>From : </p>
                    <input type = "text" className = "form-control" defaultValue = {msg.sender} style = {inputStyle9}></input>*/}
                    {/*{replyReceived = this.state.replies.map((reply,replyIndex) => (
                    <div key = {msgIndex}>*/}
                        {/*<p style = {pStyle6}>From : </p>
                        <input type = "text" className = "form-control" defaultValue = {msg.sender} style = {inputStyle9}></input>*/}
                        {/*<p style = {pStyle7}>Message : </p>
                        <textarea className = "form-control" defaultValue = {reply} style = {inputStyle8}></textarea>
                        <hr/>
                    </div>
                    ))}*/}
                </div>
            ));
        }
        return (
            <div>
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                        <a className="navbar-brand" href="#">
                            <img src = {Logo} style={imageStyle} alt="Grubhub"/>
                        </a>   
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <button className = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/Profile/:id' style = {linkStyle}>Your Profile details !</Link></button>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className = 'btn btn-outline-danger' style = {buttonStyle2}><Link to = '/' style = {linkStyle} onClick = {this.handleLogout}>Logout</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <form onSubmit = {this.handleSearchResults}>
                        <input type = "text" className = "form-control" name = "searchItem" style = {inputStyle1} placeholder = "Pizza, Sushi, Chinese, Burrito" onChange = {this.handleInput} required/>  
                        <button className = "btn btn-primary" style = {buttonStyle1}>Search</button>
                    </form>    
                    <div>
                        <div style = {divStyle1}>
                            <img src = {searchIcon} alt = "searchIcon" style = {searchStyle}></img>
                        </div>    
                        <hr/>
                        <p style = {pStyle3}>Your Active Orders</p>
                        <div className = "container">
                            <div className = "row">
                                <div className = "col-sm">
                                    {orderNameList}
                                </div>
                            </div>
                        </div>
                        <p style = {pStyle4}>Your Past Orders</p>
                        <div className = "container">
                            <div className = "row">
                                <div className = "col-sm">
                                    <div show = {this.state.show}>{deliveredList}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.setShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>No item found.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.setShowModal} onHide={this.handleCloseModal} style = {modalStyle}>
                    <Modal.Header closeButton>
                        <Modal.Title>Message the Restaurant Owner</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {messagesReceived}
                    <Alert show = {this.state.alertShow} variant = 'success'>
                        Message sent.
                    </Alert>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>To</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name = "receiver"
                            onChange = {this.handleInput}
                            placeholder="Restaurant's Name"
                            required/>
                    </InputGroup>
                    <InputGroup>
                        <FormControl 
                            as="textarea"
                            name = "message"
                            onChange = {this.handleInput}
                            required/>
                     </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleMessage.bind(this,localStorage.getItem('OrderId'))}>
                            Send
                        </Button>
                        <Button variant="primary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const messaging = () => {
    
}

export default home;