import cls from './create.module.css';

interface ActionButtonProps {
    text: string;
    action: ()=>void;
}

export function ActionButton({text, action}: ActionButtonProps) {
    return (
        <button
            className={cls.button}
            onClick={action}
        >
            {text}
        </button>
    )
}
