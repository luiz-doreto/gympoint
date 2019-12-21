import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export function formatDate(date) {
    return format(
        parseISO(date),
        "dd 'de' MMMM 'de' yyyy", // dia 22 de Janeiro de 2019
        { locale: pt }
    );
}

export function formatDateSimple(date) {
    return format(
        date,
        'dd/MM/yyyy', // 22/01/2019
        { locale: pt }
    );
}
