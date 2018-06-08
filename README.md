
just practice project, just for reference

#how to use

you have setup a redis 

### setup

```bash
npm run setup
```


### query


```bash
npm run query 交大外国语学校
```

#### output

```text
==================>  上交大闵行   <==================

上海交通大学闵行校区上院
上海交通大学闵行校区棒球场
上海交通大学闵行校区田径场
上海交通大学闵行校区动力楼
上海交通大学闵行校区建工楼
上海交通大学闵行校区教学区
上海交通大学闵行校区材料
上海交通大学闵行校区篮球场
上海交通大学闵行校区电力楼
上海交通大学闵行校区人武部
上海交通大学闵行幼儿园
上海交通大学闵行校区

 12 hits
queryTime: 8.339ms
``` 


### improve

[ ] use `zset` instead of `set`, so result can be sort/skip/limit 
