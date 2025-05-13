// JavaScript (React) - FlashAlert.jsx
import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Icon from '@/components/Icon.jsx';

const FlashAlert = () => {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        // Якщо повідомлення є, встановлюємо таймаут для його приховування
        if (flash?.success || flash?.error) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000); // 5000 мілісекунд = 5 секунд

            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!flash?.success && !flash?.error) {
        return null;
    }

    const isSuccess = flash.success;
    const isError = flash.error;
    let containerClass = "absolute top-[2%] right-[10%] z-10 rounded-[10px] p-[1em]";
    let bgClass = "";
    let borderClass = "";
    let textClass = "";
    let iconName = "infoFlash";
    let iconColor = "";

    if (isSuccess) {
        bgClass = "bg-[#49abc7a8]";
        borderClass = "border-2 border-[#03627C]";
        textClass = "text-[#03627C]";
        iconColor = "#03627C";
    } else if (isError) {
        bgClass = "bg-[#e7a19f9c]";
        borderClass = "border-2 border-[#e3342f]";
        textClass = "text-[#711917]";
        iconName = "errorFlash"; // Ви можете використати іншу іконку для помилок
        iconColor = "#e3342f";
    }

    return (
        visible && (
            <div className={`${containerClass} ${bgClass} ${borderClass} ${textClass}`}>
                <p className="flex items-center">
          <span className="mx-[1em]">
            <Icon name={iconName} color={iconColor} size={25} />
          </span>
                    {isSuccess ? flash.success : flash.error}
                </p>
                <p
                    onClick={() => setVisible(false)}
                    className="underline cursor-pointer text-end underline-offset-4"
                >
                    Dismiss
                </p>
            </div>
        )
    );
};

export default FlashAlert;
