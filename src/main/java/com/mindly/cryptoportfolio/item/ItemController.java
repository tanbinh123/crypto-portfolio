package com.mindly.cryptoportfolio.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("/api/items")
    public List<Item> listItems(){
        return itemService.listAll();
    }
    @PostMapping("/api/items")
    public void addItem(@RequestBody Item item){
        itemService.saveItem(item);
    }

    @DeleteMapping("/api/items/{id}")
    public void delete(@PathVariable Integer id){
        itemService.deleteITem(id);
    }
}
