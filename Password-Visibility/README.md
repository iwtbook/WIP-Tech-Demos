# Password Visibility

A password input field with a visibility toggle button. Designed to be compatible
with password auto-fill extensions.

[View live demo on CodePen](https://codepen.io/camdynr/pen/ZEoppev)

https://user-images.githubusercontent.com/24315259/190514011-b0948122-3e3f-4456-a4a1-928e7725788b.mov

## Installation

Simply include the `PasswordVisibility.js` script on your webpage

```html
<!-- Plain Script -->
<script src="./PasswordVisibility.js"></script>

<!-- Module -->
<script src="./PasswordVisibility.js" type="module"></script>
```

## Basic Usage

The Custom Element name is `<password-visiblity>` and it has 2 `slots`

| Slot Name | Expected Element | Required? | Description |
|--|--|--|--|
| `label` | `<label></label>` | False | The corresponding label for the input field |
| `password` | `<input type="password">` | **True** | The password input field to use |

Alltogether that might look something like this:

```html
<password-visibility>
  <label for="password" slot="label">Password</label>
  <input
    id="password"
    type="password"
    slot="password"
    name="password"
  >
</password-visibility>
```

## CSS Variables

Some variables were included to allow you to style the component, a table of them is included below. They are all prefixed with `pv` for "Password Visibility"

| Variable Name | Element Affected | CSS Property | Default Value |
|--|--|--|--|
| `--pv-display` | `:host` | `display` | `inline-grid` |
| `--pv-input-font-family` | `::slotted(input)` | `font-family` | `monospace` |
| `--pv-input-font-size` | `::slotted(input)` | `font-size` | `initial` |
| `--pv-input-height` | `::slotted(input)`, `button` | `height` | `25px` |
| `--pv-label-font-family` | `::slotted(label)` | `font-family` | `sans-serif` |
| `--pv-label-font-size` | `::slotted(label)` | `font-size` | `initial` |
| `--pv-button-width` | `button` | `width` | `23px` |
| `--pv-input-border` | `div` | `border` | `1px solid rgb(118, 118, 118)` |
| `--pv-input-border-radius` | `div` | `border-radius` | `2px` |
| `--pv-input-width` | `div` | `width` | `auto` |

## General Demo

The `index.html` webpage shows the component being used in the simplest way possible. This is the same page that was used to record the video from above.

## ZingGrid Demo

The `zinggrid.html` webpage shows this Web Component being used to extend the [ZingGrid](https://www.zinggrid.com/) library by making use of its ability to create Custom Column types.

You can read more about how that was done in [this article](https://blog.zingsoft.com/p/5cf24d98-1da5-4060-b02b-207e98b06deb/).

## Other Tips

Often it is useful to include some fallback styles incase the Web Component fails (or is slow) to load, the file `styles.css` in this repo has those styles if you would like to include them in the light DOM.
