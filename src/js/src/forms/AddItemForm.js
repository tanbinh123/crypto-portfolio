import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addNewItem } from '../client';

const inputBottomMargin = {marginBottom: '10px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputBottomMargin};

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
            }

            if (!values.createdAt) {
                errors.createdAt = 'Date of purchase Required';
            }

            if (!values.currencyType) {
                errors.currencyType = 'CurrencyType Required';
            } else if (!['Bitcoin', 'Ethereum', 'Ripple'].includes(values.currencyType)) {
                errors.currencyType = 'CurrencyType must be (Bitcoin or Ethereum or Ripple)';
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
        isValid
    }) => (
        <form onSubmit={handleSubmit}>
               
            <Input
                style={inputBottomMargin}
                name="currencyType"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.currencyType}
                placeholder='Currency: Bitcoin, Ethereum, Ripple'
            />
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