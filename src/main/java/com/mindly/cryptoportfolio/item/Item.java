package com.mindly.cryptoportfolio.item;

import javax.persistence.*;
import java.util.Date;

@Entity
//@Table(name = "item")
public class Item {
    private Integer itemId;
    private CurrencyType currencyType;
    private Integer amount;
    private Date createdAt;
    private String walletLocation;
    private Float marketPrice;

    public Item(){

    }

    public Item(Integer itemId, CurrencyType currencyType, Integer amount, Date createdAt, String walletLocation, Float marketPrice) {
        this.itemId = itemId;
        this.currencyType = currencyType;
        this.amount = amount;
        this.createdAt = createdAt;
        this.walletLocation = walletLocation;
        this.marketPrice = marketPrice;
    }

//    @SequenceGenerator(name="SEQ_GEN", sequenceName="SEQ_JUST_FOR_TEST", allocationSize=1)
//    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_GEN")
//    @GeneratedValue(strategy=GenerationType.TABLE)
//    @GeneratedValue
//    @Column(name = "item_id", unique = true, nullable = false)
//    @Column(name = "item_id", updatable = false, nullable = false)
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    @Enumerated(EnumType.STRING)
    public CurrencyType getCurrencyType() {
        return currencyType;
    }

    public void setCurrencyType(CurrencyType currencyType) {
        this.currencyType = currencyType;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getWalletLocation() {
        return walletLocation;
    }

    public void setWalletLocation(String walletLocation) {
        this.walletLocation = walletLocation;
    }

    public Float getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(Float marketPrice) {
        this.marketPrice = marketPrice;
    }


    public enum CurrencyType{
        Bitcoin, Ethereum, Ripple
    }

}
