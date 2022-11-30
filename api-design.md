# API Design

API inspired by [Jest](https://jestjs.io/):
```typescript
test("some string", () => {
  expect(someValue).assertion(expectedValue);
});

```

Mock API example:
```typescript
const score = useScore({})
```


# 5 examples of a points counter library

Design a points counter library which an end user might use to display points in a UI similar to the [Next.js Docs](https://nextjs.org/learn/foundations/about-nextjs).

My ideas below:

## Option 1

```typescript
const points.total() = pointsCounter({})
```

## Option 2

```typescript
const {points, addPoints, removePoints, resetPoints} = pointsCounter({})
```

## Option 3

```typescript
const p = new PointsCounter({})
const points = p.points()
```

## Option 4

```typescript
const points = pointsCounter().getPoints()
```

## Option 5

```typescript
const [points, addPoints, removePoints, resetPoints] = pointsCounter({})