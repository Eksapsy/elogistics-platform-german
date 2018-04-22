import React, { Component } from 'react';
import { Grid, Sticky } from 'semantic-ui-react';
import Footer from '../../components/Footer';
import ProductList from '../../components/ProductList';
import SearchBar from '../../components/SearchBar';
import './index.css';

const types  = ['GTP', 'GDP', 'GIP'];
const brands = ['HP', 'XEROX', 'CANON', 'TOSHIBA', 'BROTHER', 'KYOCERA', 'KONICA', 'OKI', 'PANASONIC'];
const pages  = ['1000 PAGES', '10000 PAGES', '5000 PAGES'];

export default class MainScene extends Component {
  render() {
    let products = [];
    for (let index = 0; index < 100; index++) {
      let typeNum = Math.floor(Math.random()*10) % 3;
      let type = typeNum === 0 ? 'TONER' : typeNum === 1 ? 'DRUM' : 'INK';
      let retail = (Math.random() * 100).toFixed(2);
      products.push({
        id: index+1,
        name: (types[typeNum] + ' ' + brands[Math.floor(Math.random()*10) % 9] + ' ' + type + ' ' + '256ml ' + pages[Math.floor(Math.random()*10) % 3]),
        amount: Math.floor(Math.random()*1000) % 1000,
        order: Math.floor(Math.random()*100) % 100,
        retail,
        wholesale: (retail*1.3).toFixed(2)
      });
      
    }
    return (
      <div id='mainScene'>
        <SearchBar/>
        <ProductList products={products}/>
      </div>
    )
  }
}
