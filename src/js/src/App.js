import React, { Component, Fragment } from 'react';
import Container from './Container';
import Footer from './Footer';
import {getAllItems, deleteItem} from './client';
import AddItemForm from './forms/AddItemForm';

import { Table, Spin, Icon, Button, notification, Popconfirm, Modal} from 'antd';

const getIndicatorIcon = () => <Icon type="loading" style={{ fontSize: 24 }} spin />;

class App extends Component {

  state = {
    items: [],
    isFetching: false,
    isAddItemModalVisisble: false,
  }

  componentDidMount () {
    this.fetchItems();
  }

  openAddItemModal = () => this.setState({isAddItemModalVisisble: true})

  closeAddItemModal = () => this.setState({isAddItemModalVisisble: false})

  openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

  fetchItems = () => {
    this.setState({
      isFetching: true
    });
    getAllItems()
      .then(res => res.json()
      .then(items => {
        console.log(items);
        this.setState({
          items,
          isFetching: false
        });
      }))
  }

  deleteItem = (itemId, currencyType) => {
    deleteItem(itemId).then(() => {
      this.openNotificationWithIcon('success', 'Item deleted', `${currencyType} was deleted`);
      this.fetchItems();
    }).catch(err => {
      this.openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }

  render() {

    const { items, isFetching, isAddItemModalVisisble } = this.state;

    const commonElements = () => (
      <div>
        <Modal
          title='Add new Item'
          visible={isAddItemModalVisisble}
          onOk={this.closeAddItemModal}
          onCancel={this.closeAddItemModal}
          width={1000}>
          <AddItemForm 
            onSuccess={() => {
              this.closeAddItemModal(); 
              this.fetchItems();
            }}
            onFailure={(error) => {
              const message = error.error.message;
              const description = error.error.httpStatus;
              this.openNotificationWithIcon('error', message, description);
            }}
          />
        </Modal>

        <Footer
          numberOfItems={items.length}
          handleAddItemClickEvent={this.openAddItemModal}
        />  
      </div>
    )

    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()}/>
        </Container>
      );
    }

    if (items && items.length) {
      const columns = [
    
        {
          title: 'Cryptocurrency',
          dataIndex: 'currencyType',
          key: 'currencyType'
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount'
        },
        {
          title: 'Date of purchase',
          dataIndex: 'createdAt',
          key: 'createdAt'
        },
        {
          title: 'Wallet Location',
          dataIndex: 'walletLocation',
          key: 'walletLocation'
        },
        {
          title: 'Current market value (EUR)',
          dataIndex: 'marketPrice',
          key: 'marketPrice'
        },
        {
          title: 'Option',
          key: 'action',
          render: (text, record) => (
            <Fragment>
              <Popconfirm
                placement='topRight'
                title={`Are you sure to delete ${record.currencyType}`} 
                onConfirm={() => this.deleteItem(record.itemId, record.currencyType)} okText='Yes' cancelText='No'
                onCancel={e => e.stopPropagation()}>
                <Button type='danger' onClick={(e) => e.stopPropagation()}>Delete</Button>
              </Popconfirm>
            </Fragment>
          ),
        }
      ];

      return (
        <Container>
          <Table 
            style={{marginBottom: '100px'}}
            dataSource={items} 
            columns={columns} 
            pagination={false}
            rowKey='itemId'/>
          {commonElements()}
        </Container>
      );

    }

    return (
      <Container>
         <h1 style={{color: '#f56a00'}}>No portfolio items found</h1>
        {commonElements()}
      </Container>
    )
  }
}

export default App;
