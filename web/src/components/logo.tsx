import { cn } from '@/libs/utils'
import { type Component, type ComponentProps, splitProps } from 'solid-js'

export const Logo: Component<ComponentProps<'svg'>> = (props) => {
    const [local, others] = splitProps(props, ['class'])

    return (
        <svg
            version="1.1"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 60 60"
            class={cn("transform-gpu shadow-sm hover:shadow-xl hover:scale-105 transition-transform", local.class)}
            {...others}
        >
            <polygon
                style="fill: black;"
                points="0,0 60,0 60,60 0,60 0,0 "
            ></polygon>
        </svg>
    )
}
