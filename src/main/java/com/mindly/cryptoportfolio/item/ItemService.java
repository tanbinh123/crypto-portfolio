package com.mindly.cryptoportfolio.item;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class ItemService {
    @Autowired
    private ItemRepository repo;

    public String uri;

    public List<Item> listAll(){
        return repo.findAll();
    }

    public void saveItem(Item item){
        calculateMarketPrice(item);
//        calculateItemID(item);

        repo.save(item);
    }

    public void deleteITem(Integer id){
        repo.deleteById(id);
    }

//    private void calculateItemID(Item item) {
//        Random rand = new Random();
//        int upperBound = 100000;
//        int randomIDNumber = rand.nextInt(upperBound);
//
//        item.setItemId(randomIDNumber);
//        System.out.println(item.getItemId() + " item.getItemId()");
//
//    }

    public void calculateMarketPrice(Item item){
        Item.CurrencyType currency_type = item.getCurrencyType();
        String currencyType = currency_type.toString();
        System.out.println(currencyType);

        checkCurrencyType(currencyType);

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);

        String bitfinixPrice = parseJsonObject(result);
        System.out.println(bitfinixPrice + " :bitfinixPrice");

        String finalPriceWithoutQuotes =  bitfinixPrice.substring(1, bitfinixPrice.length()-1);
        System.out.println(finalPriceWithoutQuotes + " :finalPriceWithoutQuotes");

        float finalPriceFloat = Float.valueOf(finalPriceWithoutQuotes.trim());
        System.out.println(finalPriceFloat + " :finalPriceFloat");

        float finalMarketPrice = finalPriceFloat * item.getAmount();
        item.setMarketPrice(finalMarketPrice);
        System.out.println(item.getMarketPrice() + " item.getMarketPrice()");
    }

    public String parseJsonObject(String gsonInput){
        JsonObject jsonObject = new Gson().fromJson(gsonInput, JsonObject.class);
        String lastPrice = String.valueOf(jsonObject.get("last_price"));
        return lastPrice;
    }

    public String checkCurrencyType(String currencyType){
        if(currencyType == "Ripple"){
            uri = "https://api.bitfinex.com/v1/ticker/xrpusd";
        }else if(currencyType == "Bitcoin"){
            uri = "https://api.bitfinex.com/v1/ticker/btcusd";
        }else{
            uri = "https://api.bitfinex.com/v1/ticker/ethusd";
        }
        return currencyType;
    }
}
