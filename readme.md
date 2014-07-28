レスポンシブで使いそうなやつ（制作中）

## Examples

```js
/* Set a listener for under 640px */
$.breaks.below(640, function(){

  // do something...

})
```

If you need to remove a specific listener at some time,
name it as third parameter.

```js
$.breaks.below(640, function(){

  // do something...

}, "SP")
```

then, call remove() with that name.

```js
$.breaks.remove("SP")
```

## APIs

#### `below(width, fn, [name])`
When window size is **less than or equal to** width, fn will fire.

#### `between(from, to, fn, [name])`
When window size is between from and to (this is include edge), fn will fire.

#### `above(width, fn, [name])`
When window size is **greater than or equal to** width, fn will fire.

#### `remove([name])`
Remove a named listener.
When name is omitted, all listeners will be removed.