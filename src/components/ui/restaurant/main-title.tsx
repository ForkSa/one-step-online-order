interface MainTitleProps {
    title: string
}
export default function MainTitle({ title }: MainTitleProps) {
    return <h3 className=" font-medium text-lg">{title}</h3>
}
