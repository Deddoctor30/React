import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';


import './app.css';


class MyData extends Component {
   constructor(props) {
      super(props);

      this.state = {
         years: 27,
         text: 'click',
         position: ""
      }
   }

   nextYear = () => {
      this.setState(state => ({                                 // тут колбек функция для того, чтобы дождаться. В круглых скобках, чтобы не писать ниже return
         years: state.years + 1
      }))
   }

   commitChanges = (event) => {
      this.setState({
         position: event.target.value
      })
   }

   render() {
      const {name, surname, link} = this.props;
      const {text, years, position} = this.state;
      return(
         <div>
            <button onClick={this.nextYear} >{text}</button>
            <h1>My name is {name}, and my surname is {surname}, age:{years}</h1>
            <a href={link}>My VK</a>
            <span>здесь написано:{position}</span>
            <form>
               <input type="text" onChange={this.commitChanges}/>
            </form>
         </div>
      )
   }
}

class App extends Component {
   constructor(props) {
      super(props)
      this.state={
         data: [
            {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
            {name: 'Alex M.', salary: 5000, increase: true, rise: false, id: 2},
            {name: 'John C.', salary: 300, increase: false, rise: false, id: 3},
            {name: 'Jannet D.', salary: 1300, increase: false, rise: false, id: 4},
         ],
         term: ''
      }
      this.idIndex = 5;
   }

   deleteItem = (id) => {
      this.setState(({data}) => {
         return {
            data: data.filter(item => item.id !== id)
         }
      })
   }

   addItem = (name, salary) => {
      const newPerson = {
         name,
         salary,
         id: this.idIndex++
      }
      this.setState(({data}) => {
         const newArr = [...data, newPerson];
         return {
            data: newArr
         }
      })
   }

   onToggleIncreace = (id) => {
      // Тут есть 2 способа, большой и понятный, и мелкий и запутанный

      // 1 метод
      // this.setState(({data}) => {
      //    const index = data.findIndex(elem => elem.id === id);

      //    const old = data[index];
      //    const newItem = {...old, increase: !old.increase};
      //    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

      //    return {
      //       data: newArr
      //    }
      // })

      // 2 метод
      this.setState(({data}) => ({
         data: data.map(item => {
            if (item.id === id) {
               return {...item, increase: !item.increase}
            }
            return item;
         })
      }))
   }

   onToggleRise = (id) => {
      this.setState(({data}) => ({
         data: data.map(item => {
            if (item.id === id) {
               return {...item, rise: !item.rise}
            }
            return item;
         })
      }))
   }

   searchEmployees = (items, term) => {
      if (term.length === 0) {
         return items;
      }
      
      return items.filter(item => {
         return item.name.indexOf(term) > -1
      })
   }

   onUpdateSearch = (term) => {
      this.setState({
         term: term
      })
   }

   render() {
      const {data, term} = this.state;
      const summ = this.state.data.length;
      const incr = this.state.data.filter(item => item.increase).length;
      const visibleData = this.searchEmployees(data, term);

      return(
      <div className="app">
         <MyData name="Vadim" surname="Novikov" link="https://vk.com/hakuuna_matata"/>
         <MyData name="Alex" surname="Blare" link="https://vk.com/"/>

         <AppInfo
         employees={summ}
         increased={incr}/>

         <div className="search-panel">
            <SearchPanel
            onUpdateSearch={this.onUpdateSearch}/>
            <AppFilter/>
         </div>

         <EmployersList 
         data={visibleData}
         onDelete={this.deleteItem}
         onToggleIncreace={this.onToggleIncreace}
         onToggleRise={this.onToggleRise}/>

         <EmployersAddForm
         onAdd={this.addItem}
         />
      </div>
   )
   }
}

export default App;