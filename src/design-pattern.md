## 单例模式

**核心答案：**  
单例模式保证一个类在系统中只有一个实例，并提供全局访问点，常用于管理全局状态、配置对象、线程池等场景。

**原理讲解：**  
单例模式的核心思想是通过限制类的实例化次数，确保系统中只有一个该类的对象。实现方式通常有懒汉式、饿汉式、双重检查锁等。单例模式需要解决多线程环境下的安全性问题，防止多个线程同时创建多个实例。

::: details 示例代码

```javascript
// 单例模式 - 懒汉式（线程安全，适用于前端 JS 环境）

class Singleton {
  // 用于存储唯一实例
  static instance = null;

  // 构造函数私有化，防止外部直接 new
  constructor() {
    if (Singleton.instance) {
      throw new Error('只能通过 getInstance() 获取实例');
    }
    // 可以在这里初始化一些全局状态
    this.config = { theme: 'dark', language: 'zh-CN' };
  }

  // 提供全局访问点
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  // 示例方法
  getConfig() {
    return this.config;
  }

  setConfig(key, value) {
    this.config[key] = value;
  }
}

// 使用示例
const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();

console.log(s1 === s2); // true，始终是同一个实例

s1.setConfig('theme', 'light');
console.log(s2.getConfig()); // { theme: 'light', language: 'zh-CN' }
```

:::


## 工厂模式

**核心答案：**  
工厂模式通过定义一个用于创建对象的接口，让子类决定实例化哪一个类，从而将对象的创建和使用解耦。

**原理讲解：**  
工厂模式主要解决对象创建的复杂性，将实例化的逻辑封装在工厂类中。常见的有简单工厂、工厂方法和抽象工厂。这样做的好处是当系统需要扩展新的产品时，只需增加新的工厂类即可，符合开闭原则。

::: details 示例代码

```javascript
// 简单工厂模式示例

class Car {
  drive() {
    console.log('开车出发');
  }
}

class Bike {
  drive() {
    console.log('骑自行车出发');
  }
}

class VehicleFactory {
  static createVehicle(type) {
    switch (type) {
      case 'car':
        return new Car();
      case 'bike':
        return new Bike();
      default:
        throw new Error('未知类型');
    }
  }
}

// 使用工厂创建对象
const car = VehicleFactory.createVehicle('car');
car.drive(); // 输出：开车出发

const bike = VehicleFactory.createVehicle('bike');
bike.drive(); // 输出：骑自行车出发
```

:::

## 观察者模式

**核心答案：**  
观察者模式定义了一种一对多的依赖关系，使得当对象状态发生变化时，所有依赖它的对象都会收到通知并自动更新。

**原理讲解：**  
观察者模式包含主题（Subject）和观察者（Observer）两个角色。主题负责维护观察者列表，并在自身状态变化时通知所有观察者。观察者则实现更新接口，响应主题的通知。常用于事件系统、数据绑定等场景。

::: details 示例代码

```javascript
// 观察者模式示例

class Subject {
  constructor() {
    this.observers = [];
  }

  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 移除观察者
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  // 通知所有观察者
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} 收到通知：`, data);
  }
}

// 使用示例
const subject = new Subject();
const observer1 = new Observer('观察者1');
const observer2 = new Observer('观察者2');

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notify('主题状态发生变化'); // 两个观察者都收到通知
```

:::



## 发布-订阅模式

**核心答案：**  
发布-订阅模式通过引入中间的事件中心，使得发布者和订阅者不直接通信，降低了耦合度，便于扩展和维护。

**原理讲解：**  
发布-订阅模式和观察者模式类似，但多了一个事件调度中心（Event Bus）。发布者将消息发送到事件中心，事件中心再分发给所有订阅者。这样发布者和订阅者互不感知，适合复杂系统的事件驱动架构。

::: details 示例代码

```javascript
// 发布-订阅模式（事件总线）示例

class EventBus {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // 发布事件
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }

  // 取消订阅
  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

// 使用示例
const bus = new EventBus();

function handler1(data) {
  console.log('订阅者1收到：', data);
}
function handler2(data) {
  console.log('订阅者2收到：', data);
}

bus.subscribe('news', handler1);
bus.subscribe('news', handler2);

bus.publish('news', '今日有大事发生！'); // 两个订阅者都收到消息

bus.unsubscribe('news', handler2);
bus.publish('news', '只剩订阅者1会收到'); // 只有订阅者1收到
```

:::



## 策略模式

**核心答案：**  
策略模式定义一系列算法，将每个算法封装起来，并使它们可以互换，客户端可根据需要选择不同的算法。

**原理讲解：**  
策略模式将算法的定义和使用分离，避免了大量的条件语句。通过组合而非继承的方式，客户端可以灵活切换不同的策略，常用于表单校验、支付方式选择等场景。

::: details 示例代码

```javascript
// 策略模式示例

// 定义一组策略
const strategies = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => b !== 0 ? a / b : NaN
};

// 上下文类，负责切换和执行策略
class Calculator {
  constructor(strategy) {
    this.setStrategy(strategy);
  }

  setStrategy(strategy) {
    this.strategy = strategies[strategy];
  }

  calculate(a, b) {
    return this.strategy(a, b);
  }
}

// 使用示例
const calc = new Calculator('add');
console.log(calc.calculate(3, 5)); // 8

calc.setStrategy('mul');
console.log(calc.calculate(3, 5)); // 15
```

:::



## 装饰器模式

**核心答案：**  
装饰器模式在不改变对象自身的前提下，动态地为其添加新的功能，增强对象的行为。

**原理讲解：**  
装饰器模式通过将目标对象包装在装饰器对象中，扩展其功能。装饰器和被装饰对象实现相同的接口，客户端可以透明地使用装饰器对象。常用于日志、权限校验、缓存等场景。

::: details 示例代码

```javascript
// 装饰器模式示例

// 基础类
class Coffee {
  cost() {
    return 5;
  }
  description() {
    return '普通咖啡';
  }
}

// 装饰器基类
class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  cost() {
    return this.coffee.cost();
  }
  description() {
    return this.coffee.description();
  }
}

// 具体装饰器
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return super.cost() + 2;
  }
  description() {
    return super.description() + ' + 牛奶';
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost() {
    return super.cost() + 1;
  }
  description() {
    return super.description() + ' + 糖';
  }
}

// 使用示例
let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.description()); // 普通咖啡 + 牛奶 + 糖
console.log(coffee.cost()); // 8
```

:::


## 代理模式

**核心答案：**  
代理模式通过引入代理对象，在不改变原有对象的前提下，控制对目标对象的访问，可用于延迟加载、安全控制、日志等场景。

**原理讲解：**  
代理模式包含真实主题（RealSubject）和代理主题（Proxy）。代理对象实现与真实对象相同的接口，并在调用真实对象前后添加额外操作。这样可以在不修改原有代码的情况下增强功能。

::: details 示例代码

```javascript
// 代理模式示例

class RealImage {
  constructor(filename) {
    this.filename = filename;
    this.loadFromDisk();
  }
  loadFromDisk() {
    console.log(`加载图片：${this.filename}`);
  }
  display() {
    console.log(`显示图片：${this.filename}`);
  }
}

// 代理类，延迟加载图片
class ProxyImage {
  constructor(filename) {
    this.filename = filename;
    this.realImage = null;
  }
  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// 使用示例
const img = new ProxyImage('test.jpg');
console.log('图片代理创建完成，还未加载图片');
img.display(); // 第一次显示时才加载图片
img.display(); // 后续直接显示，不再加载
```

:::



## 适配器模式

**核心答案：**  
适配器模式通过引入适配器，将一个接口转换成客户端期望的另一个接口，实现不同系统或类之间的兼容。

**原理讲解：**  
适配器模式包含目标接口（Target）、待适配类（Adaptee）和适配器（Adapter）。适配器实现目标接口，并持有待适配类的实例，将请求转换为待适配类能处理的格式。常用于老系统兼容、新旧接口对接等场景。

::: details 示例代码

```javascript
// 适配器模式示例

// 旧接口
class OldLogger {
  log(message) {
    console.log('OldLogger:', message);
  }
}

// 新接口
class NewLogger {
  info(msg) {
    console.log('NewLogger:', msg);
  }
}

// 适配器，将新接口适配为旧接口
class LoggerAdapter {
  constructor(newLogger) {
    this.newLogger = newLogger;
  }
  log(message) {
    this.newLogger.info(message);
  }
}

// 使用示例
const oldLogger = new OldLogger();
oldLogger.log('老系统日志');

const newLogger = new NewLogger();
const adapter = new LoggerAdapter(newLogger);
adapter.log('通过适配器调用新系统日志');
```

:::



## 组合模式

**核心答案：**  
组合模式将对象组合成树形结构以表示“部分-整体”的层次结构，使客户端对单个对象和组合对象的使用具有一致性。

**原理讲解：**  
组合模式包含叶子节点（Leaf）和容器节点（Composite），它们都实现统一的接口。容器节点可以包含子节点（既可以是叶子也可以是容器），这样客户端可以递归地处理复杂结构，常用于文件系统、组织架构等。

::: details 示例代码

```javascript
// 组合模式示例

// 统一接口
class Component {
  constructor(name) {
    this.name = name;
  }
  display(indent = 0) {
    throw new Error('需要子类实现');
  }
}

// 叶子节点
class Leaf extends Component {
  display(indent = 0) {
    console.log(' '.repeat(indent) + '- ' + this.name);
  }
}

// 容器节点
class Composite extends Component {
  constructor(name) {
    super(name);
    this.children = [];
  }
  add(child) {
    this.children.push(child);
  }
  display(indent = 0) {
    console.log(' '.repeat(indent) + '+ ' + this.name);
    this.children.forEach(child => child.display(indent + 2));
  }
}

// 使用示例
const root = new Composite('根目录');
const file1 = new Leaf('文件1.txt');
const file2 = new Leaf('文件2.txt');
const folder = new Composite('子文件夹');
const file3 = new Leaf('文件3.txt');

root.add(file1);
root.add(folder);
folder.add(file2);
folder.add(file3);

root.display();
// 输出结构化的目录树
```

:::



## 迭代器模式

**核心答案：**  
迭代器模式提供一种顺序访问集合对象元素的方法，而无需暴露集合的内部结构。

**原理讲解：**  
迭代器模式将集合的遍历行为抽象为迭代器对象，集合对象只需提供获取迭代器的方法。这样可以为不同集合提供统一的遍历接口，支持多种遍历方式，常用于自定义集合类。

::: details 示例代码

```javascript
// 迭代器模式示例

class MyCollection {
  constructor(items) {
    this.items = items;
  }
  // 返回一个迭代器
  getIterator() {
    let index = 0;
    const items = this.items;
    return {
      next: function() {
        return index < items.length
          ? { value: items[index++], done: false }
          : { value: undefined, done: true };
      }
    };
  }
}

// 使用示例
const collection = new MyCollection([1, 2, 3, 4]);
const iterator = collection.getIterator();

let result = iterator.next();
while (!result.done) {
  console.log(result.value); // 依次输出1,2,3,4
  result = iterator.next();
}
```

:::



## 享元模式

**核心答案：**  
享元模式通过共享技术有效支持大量细粒度对象的复用，减少内存消耗，提升性能。

**原理讲解：**  
享元模式将对象分为内部状态（可共享）和外部状态（不可共享），通过工厂管理和复用内部状态相同的对象。常用于需要大量重复对象的场景，如文本编辑器中的字符对象、地图上的标记等。

::: details 示例代码

```javascript
// 享元模式示例

// 享元对象
class TreeType {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  display(x, y) {
    console.log(`在(${x},${y})处种植${this.color}的${this.name}树`);
  }
}

// 享元工厂
class TreeFactory {
  constructor() {
    this.types = {};
  }
  getTreeType(name, color) {
    const key = name + color;
    if (!this.types[key]) {
      this.types[key] = new TreeType(name, color);
    }
    return this.types[key];
  }
}

// 使用示例
const factory = new TreeFactory();
const tree1 = factory.getTreeType('樱花', '粉色');
const tree2 = factory.getTreeType('樱花', '粉色');
const tree3 = factory.getTreeType('松树', '绿色');

tree1.display(1, 2);
tree2.display(2, 3);
tree3.display(3, 4);

console.log(tree1 === tree2); // true，共享同一个对象
```

:::


## 职责链模式

**核心答案：**  
职责链模式将多个处理对象串成一条链，请求沿着链传递，直到有对象处理为止，实现请求发送者与接收者解耦。

**原理讲解：**  
职责链模式由一系列处理者对象组成，每个处理者包含对下一个处理者的引用。每个处理者决定是否处理请求或将其传递给下一个处理者。常用于审批流、日志处理等场景。

::: details 示例代码

```javascript
// 职责链模式示例

class Handler {
  setNext(handler) {
    this.next = handler;
    return handler;
  }
  handle(request) {
    if (this.next) {
      return this.next.handle(request);
    }
    return null;
  }
}

class AuthHandler extends Handler {
  handle(request) {
    if (!request.user) {
      return '未登录，拒绝访问';
    }
    return super.handle(request);
  }
}

class DataHandler extends Handler {
  handle(request) {
    if (!request.data) {
      return '缺少数据';
    }
    return super.handle(request);
  }
}

class FinalHandler extends Handler {
  handle(request) {
    return '请求处理成功';
  }
}

// 使用示例
const auth = new AuthHandler();
const data = new DataHandler();
const final = new FinalHandler();

auth.setNext(data).setNext(final);

console.log(auth.handle({})); // 未登录，拒绝访问
console.log(auth.handle({ user: '张三' })); // 缺少数据
console.log(auth.handle({ user: '张三', data: '内容' })); // 请求处理成功
```

:::



## 命令模式

**核心答案：**  
命令模式将请求封装为对象，允许参数化、排队、撤销请求，实现请求发送者与接收者解耦。

**原理讲解：**  
命令模式包含命令对象（Command）、调用者（Invoker）和接收者（Receiver）。命令对象封装具体操作，调用者只需调用命令对象，无需关心具体实现。常用于操作记录、事务、按钮回调等场景。

::: details 示例代码

```javascript
// 命令模式示例

// 接收者
class Light {
  on() {
    console.log('灯打开');
  }
  off() {
    console.log('灯关闭');
  }
}

// 命令对象
class LightOnCommand {
  constructor(light) {
    this.light = light;
  }
  execute() {
    this.light.on();
  }
}

class LightOffCommand {
  constructor(light) {
    this.light = light;
  }
  execute() {
    this.light.off();
  }
}

// 调用者
class RemoteControl {
  setCommand(command) {
    this.command = command;
  }
  pressButton() {
    this.command.execute();
  }
}

// 使用示例
const light = new Light();
const onCommand = new LightOnCommand(light);
const offCommand = new LightOffCommand(light);

const remote = new RemoteControl();
remote.setCommand(onCommand);
remote.pressButton(); // 灯打开

remote.setCommand(offCommand);
remote.pressButton(); // 灯关闭
```

:::



## 模板方法模式

**核心答案：**  
模板方法模式在父类中定义算法骨架，将部分步骤延迟到子类实现，保证算法结构不变，子类可定制部分实现。

**原理讲解：**  
模板方法模式通过在父类中定义模板方法，封装通用流程，具体步骤由子类实现。这样既保证了流程的统一，又支持灵活扩展。常用于数据处理、流程控制等场景。

::: details 示例代码

```javascript
// 模板方法模式示例

class DataProcessor {
  process() {
    this.readData();
    this.processData();
    this.saveData();
  }
  readData() {
    throw new Error('子类必须实现 readData');
  }
  processData() {
    throw new Error('子类必须实现 processData');
  }
  saveData() {
    console.log('保存数据到数据库');
  }
}

class CSVProcessor extends DataProcessor {
  readData() {
    console.log('读取CSV文件');
  }
  processData() {
    console.log('处理CSV数据');
  }
}

// 使用示例
const processor = new CSVProcessor();
processor.process();
// 输出：读取CSV文件 -> 处理CSV数据 -> 保存数据到数据库
```

:::



## 中介者模式

**核心答案：**  
中介者模式通过引入中介者对象，封装对象之间的交互，减少对象之间的耦合，便于维护和扩展。

**原理讲解：**  
中介者模式包含中介者（Mediator）和同事类（Colleague）。同事类之间不直接通信，而是通过中介者转发消息。这样可以避免对象间复杂的网状关系，常用于聊天室、表单组件通信等场景。

::: details 示例代码

```javascript
// 中介者模式示例

class ChatRoom {
  showMessage(user, message) {
    console.log(`${user.getName()} 说: ${message}`);
  }
}

class User {
  constructor(name, chatRoom) {
    this.name = name;
    this.chatRoom = chatRoom;
  }
  getName() {
    return this.name;
  }
  send(message) {
    this.chatRoom.showMessage(this, message);
  }
}

// 使用示例
const chatRoom = new ChatRoom();
const alice = new User('Alice', chatRoom);
const bob = new User('Bob', chatRoom);

alice.send('大家好！');
bob.send('你好，Alice！');
```

:::

