# Enhanced colorization

The Visual Studio Code C/C++ extension now supports semantic colorization, when IntelliSense is enabled. Use of enhanced colorization is controlled by the C_Cpp.enhancedColorization setting. This setting is enabled by default.

```
"C_Cpp.enhancedColorization": "enabled"
```

## Themes

Colors can be associated using the existing support for theming and color customization in VS Code. See the VS Code Themes documentation for more information.

Colors are associated with semantic tokens as well as TextMate scopes.

### C/C++ Themes Extension

We've created a set of VS Code themes that closely resemble the default Light and Dark themes in Visual Studio, and include colors for semantic tokens. These themes can be found here.

## IntelliSense Tokens and Scopes

Token

Semantic Token name

Fallback TextMate Scope

Class Template

templateType

entity.name.type.class.templated

Enumerator

enumMember

variable.other.enummember

Event (C++/CLI)

event

variable.other.event

Function

function

entity.name.function

Function Template

templateFunction

entity.name.function.templated

Generic Type (C++/CLI)

genericType

entity.name.type.class.generic

Global Variable

variable.global

variable.other.global

Label

label

entity.name.label

Local Variable

variable.local

variable.other.local

Macro

macro

entity.name.function.preprocessor

Member Field

property

variable.other.property

Member Function

method

entity.name.function.member

Namespace

namespace

entity.name.namespace

New / Delete

newOperator

keyword.operator.new

Operator Overload Function

operatorOverload

entity.name.function.operator

Operator Overload Member

memberOperatorOverload

entity.name.function.operator.member

Parameter

parameter

variable.parameter

Property (C++/CLI)

cliProperty

variable.other.property.cli

Reference Type (C++/CLI)

referenceType

entity.name.type.class.reference

Static Member Field

property.static

variable.other.property.static

Static Member Function

method.static

entity.name.function.member.static

Type

type

entity.name.type

User-Defined Literal - Number

numberLiteral

entity.name.operator.custom-literal.number

User-Defined Literal - Raw

customLiteral

entity.name.operator.custom-literal

User-Defined Literal - String

stringLiteral

entity.name.operator.custom-literal.string

Value Type (C++/CLI)

valueType

entity.name.type.class.value

## Customizing Colors in Settings

Colors can also be overridden globally, in settings:

```
    "editor.semanticTokenColorCustomizations": {
        "rules": {
            "templateType": {
                "foreground": "#ff0000",
                "fontStyle": "italic bold underline"
            }
        }
    }
```

Or, overridden on a per-theme basis:

```
    "editor.semanticTokenColorCustomizations": {
        "[Visual Studio Dark]": {
            "rules": {
                "templateType": {
                    "foreground": "#ff0000",
                    "fontStyle": "italic bold underline"
                }
            }
        }
    }
```

2/23/2023