export default function SupportedPayment() {
    const supportedPaymentImgs = [
        'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/qris-5ab65ea8ea12e00daee664042ed976a75c574fcd2fb1acd04e6cfc773d9bda54.svg',
        'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/shopeepay-later-page-21428cdc82b5302587fd994912c8ead43c53c92efb325275279131bf42dea426.svg',
        'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/shopeepay-befa05d168fe30229a3a68f8520595ceee165df888500c15502eb6f6ff26301c.svg',
        // 'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/amex-ed1086d45896624caad387dce053afcab451fff7a9d0d9dbcf7bc5d5f86daabb.svg',
        // 'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/jcb-9122ec6ca67378402091d16e1da82eff265843bae6b7f83a714a202689d0ddcd.svg',
        // 'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/mastercard-88522e14ce7d370c25d16071024fc87ba9256c5dca8bf5741fadb4948ff506d4.svg',
        // 'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/visa-5e36b65d2243615099273be2fd269e201439dc0064105b2517bcc3cf85f0b06e.svg',
        // 'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/bri-39f5d44b1c42e70ad089fc52b909ef410d708d563119eb0da3a6abd49c4a595c.svg',
        // 'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/bni-163d98085f5fe9df4068b91d64c50f5e5b347ca2ee306d27954e37b424ec4863.svg',
        // 'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/mandiri-23c931af42c624b4533ed48ac3020f2b820f20c7ad08fb9cf764140e5edbe496.svg',
        // 'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/bca-906e4db60303060666c5a10498c5a749962311037cf45e4f73866e9138dd9805.svg',
        'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/gopay-54a920655c809232af3d38437181f5aa1e439186b6630aa5fe585862aba0a726.svg',
        'https://d2f3dnusg0rbp7.cloudfront.net/snap/v4/assets/gopaylater-4583af737060a5f72eceecebd78c916887551f074de027320c5e0ff0fcb7616a.svg'
    ];

    return (
        <div>
            <div className="text-slate-400 mt-5 mb-3 text-xs">Supported payments:</div>
            {
                supportedPaymentImgs.map(s => <img src={s} width={30} className="inline ml-3 mb-3" />)
            }
        </div>
    )
}