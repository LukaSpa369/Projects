$(document).ready(function() {
    function fetchExchangeRates() {
        const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $('#tableBody').empty();

                const iconMap = {
                    USD: 'us',
                    EUR: 'eu',
                    GBP: 'gb',
                    JPY: 'jp',
                    AUD: 'au',
                    CAD: 'ca',
                    CHF: 'ch',
                    AED: 'ae',
                    AFN: 'af',
                    ALL: 'al',
                    AMD: 'am',
                    ANG: 'ag',
                    AOA: 'ao',
                    ARS: 'ar',
                    AWG: 'aw',
                    AZN: 'az',
                    BAM: 'ba',
                    BBD: 'bb',
                    BDT: 'bd',
                    BGN: 'bg',
                    BHD: 'bh',
                    BIF: 'bi',
                    BMD: 'bm',
                    BND: 'bn',
                    BOB: 'bo',
                    BRL: 'br',
                    BSD: 'bs',
                    BTN: 'bt',
                    BWP: 'bw',
                    BYN: 'by',
                    BZD: 'bz',
                    CDF: 'cd',
                    CLP: 'cl',
                    CNY: 'cn',
                    COP: 'co',
                    CRC: 'cr',
                    CUP: 'cu',
                    CVE: 'cv',
                    CZK: 'cz',
                    DJF: 'dj',
                    DKK: 'dk',
                    DOP: 'do',
                    DZD: 'dz',
                    EGP: 'eg',
                    ERN: 'er',
                    ETB: 'et',
                    FJD: 'fj',
                    FKP: 'fk',
                    FOK: 'fo',
                    GEL: 'ge',
                    GGP: 'gg',
                    GHS: 'gh',
                    GIP: 'gi',
                    GMD: 'gm',
                    GNF: 'gn',
                    GTQ: 'gt',
                    GYD: 'gy',
                    HKD: 'hk',
                    HNL: 'hn',
                    HRK: 'hr',
                    HTG: 'ht',
                    HUF: 'hu',
                    IDR: 'id',
                    ILS: 'il',
                    IMP: 'im',
                    INR: 'in',
                    IQD: 'iq',
                    IRR: 'ir',
                    ISK: 'is',
                    JEP: 'je',
                    JMD: 'jm',
                    JOD: 'jo',
                    KES: 'ke',
                    KGS: 'kg',
                    KHR: 'kh',
                    KID: 'ki',
                    KMF: 'km',
                    KRW: 'kr',
                    KWD: 'kw',
                    KYD: 'ky',
                    KZT: 'kz',
                    LAK: 'la',
                    LBP: 'lb',
                    LKR: 'lk',
                    LRD: 'lr',
                    LSL: 'ls',
                    LYD: 'ly',
                    MAD: 'ma',
                    MDL: 'md',
                    MGA: 'mg',
                    MKD: 'mk',
                    MMK: 'mm',
                    MNT: 'mn',
                    MOP: 'mo',
                    MRU: 'mr',
                    MUR: 'mu',
                    MVR: 'mv',
                    MWK: 'mw',
                    MXN: 'mx',
                    MYR: 'my',
                    MZN: 'mz',
                    NAD: 'na',
                    NGN: 'ng',
                    NIO: 'ni',
                    NOK: 'no',
                    NPR: 'np',
                    NZD: 'nz',
                    OMR: 'om',
                    PAB: 'pa',
                    PEN: 'pe',
                    PGK: 'pg',
                    PHP: 'ph',
                    PKR: 'pk',
                    PLN: 'pl',
                    PYG: 'py',
                    QAR: 'qa',
                    RON: 'ro',
                    RSD: 'rs',
                    RUB: 'ru',
                    RWF: 'rw',
                    SAR: 'sa',
                    SBD: 'sb',
                    SCR: 'sc',
                    SDG: 'sd',
                    SEK: 'se',
                    SGD: 'sg',
                    SHP: 'sh',
                    SLE: 'sl',
                    SLL: 'sl',
                    SOS: 'so',
                    SRD: 'sr',
                    SSP: 'ss',
                    STN: 'st',
                    SYP: 'sy',
                    SZL: 'sz',
                    THB: 'th',
                    TJS: 'tj',
                    TMT: 'tm',
                    TND: 'tn',
                    TOP: 'to',
                    TRY: 'tr',
                    TTD: 'tt',
                    TVD: 'tv',
                    TWD: 'tw',
                    TZS: 'tz',
                    UAH: 'ua',
                    UGX: 'ug',
                    UYU: 'uy',
                    UZS: 'uz',
                    VES: 've',
                    VND: 'vn',
                    VUV: 'vu',
                    WST: 'ws',
                    XAF: 'cm',
                    XCD: 'ag',
                    XDR: 'un',
                    XOF: 'bf',
                    XPF: 'pf',
                    YER: 'ye',
                    ZAR: 'za',
                    ZMW: 'zm',
                    ZWL: 'zw'
                };
                
                for (let currency in data.rates) {
                    let newRow = $('<tr>');

                    // Flag image cell
                    let flagCell = $('<td>');
                    let flagImg = $('<img>');

                    if (iconMap[currency]) {
                        flagImg.attr('src', iconMap[currency].includes('images') ? iconMap[currency] : `https://flagcdn.com/16x12/${iconMap[currency]}.png`);
                    } else {
                        flagImg.attr('src', 'path_to_default_image.png'); // Optional: Default image if not mapped
                    }

                    flagImg.addClass('flag-icon'); // Optional: Add a class for styling
                    flagCell.append(flagImg);
                    newRow.append(flagCell);

                    // Currency name cell
                    let currencyCell = $('<td>').text(currency);
                    newRow.append(currencyCell);

                    // Buying rate cell
                    let buyingRateCell = $('<td>').text((data.rates[currency] * 0.99).toFixed(2)); 
                    newRow.append(buyingRateCell);

                    // Middle rate cell
                    let middleRateCell = $('<td>').text(data.rates[currency].toFixed(2));
                    newRow.append(middleRateCell);

                    // Selling rate cell
                    let sellingRateCell = $('<td>').text((data.rates[currency] * 1.01).toFixed(2)); 
                    newRow.append(sellingRateCell);

                    $('#tableBody').append(newRow);
                }
            },
            error: function(error) {
                console.error('Error fetching data:', error);
                $('#tableBody').html('<tr><td colspan="5">An error occurred, please try again later.</td></tr>');
            }
        });
    }

    fetchExchangeRates();
});
