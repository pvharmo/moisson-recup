<script lang="ts">
    import type { FrameColor } from "flowbite-svelte/Frame.svelte";
    import { Alert } from "flowbite-svelte";

    type AlertType = "success" | "error" | "warning" | "info" | FrameColor

    export let type: AlertType = "default"
    export let dismissable = true
    export let border = true

    const color = (t: AlertType) => {
        switch (t) {
            case "success":
                return "green"
            case "warning":
                return "yellow"
            case "error":
                return "red"
            case "info":
                return "blue"
            default:
                return t
        }
    }
</script>

<Alert color={color(type)} {dismissable} {border} {...$$restProps} >
    <slot />
</Alert>