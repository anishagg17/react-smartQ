import React from 'react';
import './App.css';
import Darkmode from 'darkmode-js';
import axios from 'axios';
import Spinner from './Spinner';
import {url,options}  from './config';
import {Verify,getTime} from './Utils';


const getHeading= () =>{
  // time="19"
  let time=new Date().getHours();
  time=time.toString();
  if(time.length<2) time="0"+time;
  console.log(time)
  if(time <= "11" && time >= "07") return "Lunch"
  else if(time <= "23" && time >= "17") return "Dinner"
  else return " No Items at this time "
}
const sortItems=(sitems,by)=>{
  if(by===0)
  return sitems.sort(
    (a,b) =>  a.price-b.price
  );
  else 
  return sitems.sort(
    (a,b) =>  b.price-a.price
  );
}

class App extends React.Component {
  state={
    food:[ ],
    search:'',
    sby:0,
    cart:[],
    page:0,
    loading:true,
  }
  handelItem=(id,v)=>{
    let res=this.state.food;
    let c=res[id];
    c={...c,cart:c.cart+v}
    res[id]=c;
    this.setState({food:res})
  }
  

  componentDidMount(){
    axios.get(url).then(res => { 
      let result=[];
      res.data.forEach((el,index) => {
        result=[...result,{...el,id:index,cart:0}]
      });
      console.log(result);
      this.setState( {food : result}) 
      this.setState( {loading  : false}) 
    })
    .catch(()=> {
      alert("UNABLE TO FETCH data")
      this.setState( {loading  : false})
    })
  }

  toggleSort = () => {
    let cu=this.state.sby;
    cu=cu^1;
    this.setState({  sby : cu,  })
  };

  togglePage = () => {
    let cu=this.state.page;
    cu=cu^1;
    this.setState({  page : cu,  })
  };
  
  render(){
    // const classes=useStyles();
    if(this.state.loading){
      return(
        <Spinner/>
      );
    }
   
    let navbar=<div className="Nav">
    <input type='text' className="In" value={this.state.search}
     onChange={
       (event) => this.setState({
         search : event.target.value,
       })
     }
    />
      
    <div className='button' onClick={this.toggleSort}>Sort {!this.state.sby?
        "↓":"↑"}</div>
    <div className='button' onClick={this.togglePage}>{!this.state.page?"Check Out":"Home"}</div>
 </div>;
   const {food,page} =this.state
   if(page===1){
      let cart=[];  let price=0;
      food.forEach(f=>{
        if(f.cart>0){ 
          let x;
          let t=f.cart*f.price;
          x=<div className='rec'>
            <p>{f.itemname}</p>
            <p className='buts'>
              <div className='button' onClick={()=>this.handelItem(f.id,-1)}>-</div>
              &nbsp;&nbsp;&nbsp;{f.cart}&nbsp;&nbsp; 
              <div className='button' onClick={()=>this.handelItem(f.id,1)}>+</div>
            </p>
            <div className = 'det'>{f.cart} x Rs{f.price}</div>
            <div className = 'tot'>Rs {t}</div>
            <hr/>
          </div>;
          cart.push(x);
          price+=t;
        }
      })
      if(cart.length===0)
      return(<React.Fragment>
          {navbar}
          <h2>Cart is Empty</h2>
          </React.Fragment>)
      return(
        <React.Fragment>
          {navbar}
          <h3 >Your Order Details</h3>
          {cart}
          <p className="x">Total : {price}Rs</p>
          <div className='button xbtn' onClick={
            ()=>{alert("order placed")}
          }>
            Confirm
          </div>
          <br/><br/><br/><br/>
        </React.Fragment>
      )
    }
    let items=this.state.food
    let time=getTime(); 
    // console.log(this.state.search)
    const sitems=items.filter((i) => {
      return (Verify(i,time) && i.itemname.includes(this.state.search))
    })
    
    const pitems=sortItems(sitems,this.state.sby)
   
    const ditems=pitems.map((i)=>{
      let bts;
      if(i.cart===0){
        bts = <div className='button' onClick={()=>this.handelItem(i.id,1)}>Add</div>
      }
      else{
        bts = <div>
                <div className='button' onClick={()=>this.handelItem(i.id,-1)}>-</div>
                &nbsp;&nbsp;&nbsp;{" "+i.cart+"     "} &nbsp;&nbsp;&nbsp;
                <div className='button' onClick={()=>this.handelItem(i.id,1)}>+</div>
              </div>
      }
      return(
        <div key={i.id}>
          <p className = 'nm'>  {i.itemname} </p>
          <p className = 'pr'> Rs.{i.price} </p>
          <br></br>
          {bts}
        </div>)
    });
    
    return (
      <React.Fragment>
        {navbar}
        <h2>{getHeading()}</h2>
        <div className="App">
          {items.length>0 ? ditems : "NO items"}
        </div>
        {new Darkmode(options).showWidget()}
      </React.Fragment>
    )
  }
}

export default App;
