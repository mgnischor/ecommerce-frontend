import { Injectable, signal, computed } from '@angular/core';

type SupportedLang = 'en' | 'es' | 'pt-BR';

const SUPPORTED_LANGS: SupportedLang[] = ['en', 'es', 'pt-BR'];
const DEFAULT_LANG: SupportedLang = 'en';

@Injectable({ providedIn: 'root' })
export class TranslateService {
    private readonly translations = signal<Record<string, string>>({});
    private readonly currentLang = signal<SupportedLang>(DEFAULT_LANG);

    readonly lang = computed(() => this.currentLang());

    readonly locale = computed(() => {
        const map: Record<SupportedLang, string> = {
            'pt-BR': 'pt-BR',
            en: 'en-US',
            es: 'es',
        };
        return map[this.currentLang()];
    });

    init(): Promise<void> {
        const lang = this.detectLanguage();
        this.currentLang.set(lang);
        return this.loadTranslations(lang);
    }

    get(key: string, params?: Record<string, string | number>): string {
        let value = this.translations()[key] ?? key;
        if (params) {
            for (const [paramKey, paramValue] of Object.entries(params)) {
                value = value.replace(`{{${paramKey}}}`, String(paramValue));
            }
        }
        return value;
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat(this.locale(), {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    }

    formatDate(date: string | undefined, options?: Intl.DateTimeFormatOptions): string {
        if (!date) return '—';
        return new Date(date).toLocaleDateString(this.locale(), options);
    }

    private detectLanguage(): SupportedLang {
        const browserLang = navigator.language || navigator.languages?.[0] || '';
        if (browserLang.startsWith('pt')) return 'pt-BR';
        if (browserLang.startsWith('es')) return 'es';
        return 'en';
    }

    private async loadTranslations(lang: SupportedLang): Promise<void> {
        try {
            const response = await fetch(`/i18n/${lang}.json`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            this.translations.set(this.flatten(data));
        } catch {
            if (lang !== DEFAULT_LANG) {
                return this.loadTranslations(DEFAULT_LANG);
            }
        }
    }

    private flatten(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
        const result: Record<string, string> = {};
        for (const [key, value] of Object.entries(obj)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (typeof value === 'string') {
                result[fullKey] = value;
            } else if (typeof value === 'object' && value !== null) {
                Object.assign(result, this.flatten(value as Record<string, unknown>, fullKey));
            }
        }
        return result;
    }
}
