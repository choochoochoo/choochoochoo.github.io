module.exports = {
    block: 'page',
    title: 'Title of the page',
    favicon: '/favicon1.ico',
    head: [
        {elem: 'meta', attrs: {name: 'description', content: ''}},
        {elem: 'meta', attrs: {name: 'viewport', content: 'width=device-width, initial-scale=1'}},
        {elem: 'css', url: 'index.min.css'}
    ],
    scripts: [{elem: 'js', url: 'index.min.js'}],
    content: [
        {
            block: 'article',
            content: [
                {
                    block: 'section',
                    content: [
                        {
                            elem: 'header',
                            elemMods: {picture: 'faroe'},
                            content: [
                                {
                                    elem: 'layout',
                                    content: [
                                        {
                                            elem: 'top-row',
                                            elemMods: {},
                                            content: [
                                                {
                                                    elem: 'vcenter',
                                                    content: [
                                                        {
                                                            elem: 'title',
                                                            content: 'ФАРЕРЫ'
                                                        },
                                                        {
                                                            elem: 'subtitle',
                                                            content: 'ПЕРВЫЙ РАЗ В ИСТОРИИ'
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            elem: 'bottom-row',
                                            content: {
                                                elem: 'vcenter',
                                                content: [
                                                    {
                                                        elem: 'subscription1',
                                                        content: [,
                                                            'Первоисточник: ',
                                                            {
                                                                block: 'link',
                                                                mods : { theme : 'faroe' },
                                                                url: 'http://silavetra.com/faroeislands',
                                                                content: 'http://silavetra.com/faroeislands',
                                                                target: '_blank'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        elem: 'subscription2',
                                                        content: 'Авторы: Алиса Сорокина, Яна Сорокина, Ольга Цапко - команда "Силы Ветра"'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            elem: 'main',
                            content: [
                                {
                                    elem: 'layout-text',
                                    content: [
                                        {
                                            elem: 'quote',
                                            elemMods: {important: true},
                                            content: {
                                                elem: 'quote-content',
                                                content: 'Пятнадцать человек и семь дней интригующей неизвестности. ' +
                                                'Все ждали той особенной свободы, присущей только северному морю на краю цивилизации.'
                                            }
                                        },
                                        {
                                            elem: 'paragraph',
                                            elemMods: {offset: true},
                                            content: [
                                                {
                                                    elem: 'dropcap',
                                                    content: 'В'
                                                },
                                                'сё началось праздничным январским вечером. Мы с друзьями собрались, ' +
                                                'чтобы отметить Рождество, приготовить вкусный ужин и посмотреть кино. ' +
                                                'С другого конца стола я услышала:'

                                            ]
                                        },
                                        {
                                            elem: 'paragraph',
                                            elemMods: {offset: true},
                                            content: '— Давайте летом поедем туда!'
                                        },
                                        {
                                            elem: 'paragraph',
                                            content: '— Куда? — спросила я.'
                                        },
                                        {
                                            elem: 'paragraph',
                                            elemMods: {offset: true},
                                            content: 'Вместо ответа мне показали фотографии. Я ещё не знала, что это за место, ' +
                                            'в какой точке Земли находится, как называется, но уже понимала — еду!'
                                        },
                                        {
                                            elem: 'paragraph',
                                            elemMods: {offset: true},
                                            content: 'За этим последовали обычные хлопоты подготовки к поездке: получение визы, ' +
                                            'приобретение и сбор всего необходимого, поиски информации и составление маршрутов.'
                                        },
                                        {
                                            elem: 'paragraph',
                                            elemMods: {offset: true},
                                            content: 'Вопрос о способе передвижения между островами перед нами не стоял. ' +
                                            'Две яхты были готовы к отплытию 26 июля 2015 года. Кстати говоря, мы были первыми, ' +
                                            'кто арендовал яхты на целую неделю. В нашем распоряжении была лоция с подробной ' +
                                            'информацией о маринах, течениях, ветрах, но никаких фотографий, описаний, отзывов и ' +
                                            'впечатлений других яхтсменов мы не нашли. Это дало нам прекрасный шанс почувствовать ' +
                                            'себя первооткрывателями.'
                                        },
                                        {
                                            elem: 'quote',
                                            elemMods: {important: true, bottom: true},
                                            content: {
                                                elem: 'quote-content',
                                                content: 'Практически всё, что мы знали о Фарерах, когда садились в самолет, ' +
                                                '— это то, что овец в этом месте больше, чем людей, что фарерцы охотятся на дельфинов, ' +
                                                'что там живут смешные птицы под названием тупики, что острова — одно из самых рыбных ' +
                                                'мест на Земле, и там очень красиво.'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    block: 'section',
                    mods: {offset: true},
                    content: [
                        {
                            elem: 'header',
                            elemMods: {picture: 'flight-road'},
                            content: [
                                {
                                    elem: 'layout',
                                    content: [
                                        {
                                            elem: 'top-row',
                                            elemMods: {},
                                            content: [
                                                {
                                                    elem: 'vcenter',
                                                    content: [
                                                        {
                                                            elem: 'title',
                                                            content: 'ПЕРЕЛЁТ И ДОРОГА'
                                                        },
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            elem: 'main',
                            content: [
                                {
                                    elem: 'layout-text',
                                    content: [
                                        {
                                            elem: 'quote',
                                            elemMods: {important: true},
                                            content: {
                                                elem: 'quote-content',
                                                content: 'Первыми жителями Фарерских островов, которых мы встретили, ' +
                                                'оказались овцы. Они просто гуляли по территории аэропорта.'
                                            }
                                        },
                                        {
                                            elem: 'paragraph',
                                            elemMods: {offset: true},
                                            content: 'Когда самолёт, выполняющий рейс Копенгаген — Воар (Vágar), начал ' +
                                            'снижаться, мы прилипли к иллюминаторам. Всюду был туман, из которого вдруг ' +
                                            'выплыли величественные скалы и то самое знаменитое озеро Сёрвагсватн (Sørvágsvatn),' +
                                            ' над которым мы летели так низко, что казалось, будто самолет будет приводняться.'
                                        },
                                        {
                                            elem: 'paragraph',
                                            elemMods: {offset: true},
                                            content: 'Мы ещё не сошли на землю, но уже впечатлились суровым пейзажем: ' +
                                            'невероятные зелёные холмы, высоченные утёсы, такие ровные, будто их ножом ' +
                                            'срезали, тёмная, живая вода океана, густой туман и водопады. Фарерские острова — ' +
                                            'это страна мистических туманов, ветров и водопадов. По местной легенде, названия ' +
                                            'водопадов — это вербальное выражение уникального шума каждого из них. ' +
                                            'Фарерцы слушали их и давали имена.'
                                        },
                                        {
                                            elem: 'quote',
                                            elemMods: {bottom: true},
                                            content: {
                                                elem: 'quote-content',
                                                content: 'Если вы не арендуете машину, заранее посмотрите расписание ' +
                                                'автобусов из аэропорта в Торсхавн (Torshavn). Они ходят достаточно редко.' +
                                                'Стоимость билета — 90 датских крон (примерно 850 р.)'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    block: 'section',
                    mods: {offset: true},
                    content: [
                        {
                            elem: 'header',
                            elemMods: {picture: 'weather'},
                            content: [
                                {
                                    elem: 'layout',
                                    content: [
                                        {
                                            elem: 'top-row',
                                            elemMods: {},
                                            content: [
                                                {
                                                    elem: 'vcenter',
                                                    content: [
                                                        {
                                                            elem: 'title',
                                                            content: 'ПОГОДА'
                                                        },
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },
                    ]
                },
            ]
        }
    ]
};
