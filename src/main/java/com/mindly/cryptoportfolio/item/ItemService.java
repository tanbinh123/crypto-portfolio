package com.mindly.cryptoportfolio.item;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.*;

@Service
public class ItemService {
    @Autowired
    private ItemRepository repo;

    public String uri;

    public List<Item> listAll(){
        return repo.findAll();
    }

    public void saveItem(@Valid Item item){
        calculateMarketPrice(item);
        repo.save(item);
    }

    public void deleteITem(Integer id){
        repo.deleteById(id);
    }

    public void calculateMarketPrice(Item item){
        Item.CurrencyType currency_type = item.getCurrencyType();
        String currencyType = currency_type.toString();
        checkCurrencyType(currencyType);

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        String bitfinixPrice = parseJsonObject(result);

        String bitfinixPriceWithoutQuotes =  bitfinixPrice.substring(1, bitfinixPrice.length()-1);
        float bitfinixPriceFloat = Float.valueOf(bitfinixPriceWithoutQuotes);

        float finalMarketPrice = bitfinixPriceFloat * item.getAmount() ;

        float finalMarketPriceTrimmed = trimFinalMarketPrice(finalMarketPrice);
        item.setMarketPrice(finalMarketPriceTrimmed);
    }

    //returns only last_price from the endpoint
    public String parseJsonObject(String gsonInput){
        JsonObject jsonObject = new Gson().fromJson(gsonInput, JsonObject.class);
        String lastPrice = String.valueOf(jsonObject.get("last_price"));
        return lastPrice;
    }

    //Handling which endpoint to hit
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

    //In order not to return the full float number to the frontend
    public float trimFinalMarketPrice(float price){
        String finalTrimmedNumber = String.format("%.2f", price);
        float finalMarketPriceTrimmed = Float.valueOf(finalTrimmedNumber);
        return finalMarketPriceTrimmed;
    }
}
