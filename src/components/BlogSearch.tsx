'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from 'use-debounce';

export default function BlogSearch({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [text, setText] = useState(searchParams.get('q') || '');
    const [debouncedText] = useDebounce(text, 300); 

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (debouncedText) {
            params.set('q', debouncedText);
        } else {
            params.delete('q');
        }

        replace(`${pathname}?${params.toString()}`);

    }, [debouncedText, pathname, replace, searchParams]);

    return (
        <div className="blog-search-form">
            <i className="fas fa-search search-icon"></i>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                className="blog-search-input"
            />
        </div>
    );
}