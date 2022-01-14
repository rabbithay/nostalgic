export const movies = [
    {
        id: 1,
        movieTitle: "O jogo da imitação",
        parentalRating: "12",
        newRelease: "não"
    },{
        id: 2,
        movieTitle: "A teoria de tudo",
        parentalRating: "10",
        newRelease: "não"
    },{
        id: 3,
        movieTitle: "Piratas do Caribe",
        parentalRating: "14",
        newRelease: "não"
    },{
        id: 4,
        movieTitle: "Não olhe para cima",
        parentalRating: "18",
        newRelease: "sim"
    },{
        id: 5,
        movieTitle: "Vingança e Castigo",
        parentalRating: "18",
        newRelease: "não"
    },{
        id: 6,
        movieTitle: "O Esquadrão Suicida",
        parentalRating: "16",
        newRelease: "não"
    },{
        id: 7,
        movieTitle: "Eternos",
        parentalRating: "14",
        newRelease: "sim"
    },{
        id: 8,
        movieTitle: "Shang-Chi e a Lenda dos Dez Anéis",
        parentalRating: "10",
        newRelease: "sim"
    },{
        id: 9,
        movieTitle: "Homem-Aranha: Sem Volta para Casa",
        parentalRating: "12",
        newRelease: "sim"
    },{
        id: 10,
        movieTitle: "Uma mente brilhante",
        parentalRating: "10",
        newRelease: "não"
    },

]

function categoryFilters (table, category) {
    const filters = {}

    table.forEach(element => {
        filters[element[category]] = element[category]
    });

    const filterList = []

    for (const [key, value] of Object.entries(filters)) {
        filterList.push(
            {
                text: key,
                value: value
            }
        )                
    }

    return filterList
}

export const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Título',
      dataIndex: 'movieTitle',
      key: 'movieTitle',
      sorter: (a, b) => a.movieTitle.localeCompare(b.movieTitle)
    },
    {
      title: 'Classificação Indicativa',
      dataIndex: 'parentalRating',
      key: 'parentalRating',
      sorter: (a, b) => a.parentalRating - b.parentalRating,
        filters: categoryFilters(movies, 'parentalRating'),
        onFilter: (value, record) => record.parentalRating.indexOf(value) === 0,
    },
    {
        title: 'Lançamento',
        dataIndex: 'newRelease',
        key: 'newRelease',
        filters: categoryFilters(movies, 'newRelease'),
        onFilter: (value, record) => record.newRelease.indexOf(value) === 0,
    },
  ];
  