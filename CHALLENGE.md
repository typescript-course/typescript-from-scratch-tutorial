# challenge

a challenge for the brave

## problem
build a component library with 2 components and publish to npm

## requirements
- should be at least 2 components
    - required
- should be able to install as npm package
    - required

## example
```tsx
import {Component1, Component2} from "@user/component-library"

function App() {
    return (
        <div>
            <Component1 prop="something">
            <Component2 otherProp={false}>
        </div>
    )
}
```