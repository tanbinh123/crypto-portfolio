import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag, Select } from 'antd';
import { addNewItem } from '../client';

const inputBottomMargin = {marginBottom: '10px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputBottomMargin};

const Option = Select.Option;

const AddItemForm = (props) => (
    <Formik
        initialValues={{ currencyType: '', amount: '', createdAt: '', walletLocation: ''}}
        validate={values => {
            let errors = {};

            if (!values.walletLocation) {
                errors.walletLocation = 'Wallet location Required'
            }

            if (!values.amount) {
                errors.amount = 'Amount Required'
            }else if(values.amount < 0){
                errors.amount = 'Positive number Required'
            }

            if (!values.createdAt) {
                errors.createdAt = 'Date of purchase Required';
            }

            if (!values.currencyType) {
                errors.currencyType = 'Cryptocurrency Required';
            } else if (!['Bitcoin', 'Ethereum', 'Ripple'].includes(values.currencyType)) {
                errors.currencyType = 'Cryptocurrency must be (Bitcoin or Ethereum or Ripple)';
            }

            return errors;
        }}
        onSubmit={(item, { setSubmitting }) => {
            addNewItem(item).then(() => {
                props.onSuccess();
            })
            .catch(err => {
                props.onFailure(err);
            })
            .finally(() => {
                setSubmitting(false);
            })
        }}>
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        setFieldTouched,
        setFieldValue,
        isValid
    }) => (
        <form onSubmit={handleSubmit}>
            <h6>Please enter Cryptocurrency</h6>
            <Select
            placeholder="Please enter Cryptocurrency"
              style={inputBottomMargin}
              onChange={value => setFieldValue("currencyType", value)}
              onBlur={() => setFieldTouched("currencyType", true)}
              value={values.currencyType}
            >
              <Option key={1} value="Ripple">
              Ripple
              </Option>
              <Option key={2} value="Ethereum">
              Ethereum
              </Option>
              <Option key={3} value="Bitcoin">
              Bitcoin
              </Option>
            </Select>

            {/* <Input
                style={inputBottomMargin}
                name="currencyType"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.currencyType}
                placeholder='Currency: Bitcoin, Ethereum, Ripple'
            /> */}
            {errors.currencyType && touched.currencyType &&
                    <Tag style={tagStyle}>{errors.currencyType}</Tag>}
            <Input
                style={inputBottomMargin}
                name="amount"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount}
                placeholder='Please enter an amount'
            />
            {errors.amount && touched.amount && 
                <Tag style={tagStyle}>{errors.amount}</Tag>}
            <Input
                style={inputBottomMargin}
                name="createdAt"
                type="date"
                onKeyDown={(e) => e.preventDefault()}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.createdAt}
                placeholder='Date of purchase'
            />
            {errors.email && touched.email && 
                <Tag style={tagStyle}>{errors.email}</Tag>}
            <Input
                style={inputBottomMargin}
                name="walletLocation"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.walletLocation}
                placeholder='Wallet Location'
            />
            {errors.walletLocation && touched.walletLocation && 
                <Tag style={tagStyle}>{errors.walletLocation}</Tag>}
            <Button 
                onClick={() => submitForm()} 
                type="submit" 
                disabled={isSubmitting | (touched && !isValid)}>
                Submit
            </Button>
        </form>
    )}
    </Formik>
);

export default AddItemForm;