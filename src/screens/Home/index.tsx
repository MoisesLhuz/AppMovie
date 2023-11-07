import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native"
import { styles } from "./styles"
import { MagnifyingGlass } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { CardMovies } from "../../components/CardMovies";
import { api } from "./services/api";
import {useNavigation} from "@react-navigation/native"

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}


export function Home(){
    // state para listar os filmes
    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([])
    // state rolagem de pagina quando setar 50% da tela
    const [page, setPage] = useState(1)
    // state loading scroll com spiner
    const [loading, setLoading] = useState(false)
    // state se não existir resultado dos movies na busca na API
    const [noResult, setNoResult] = useState(false)
    // state busca de filmes
    const [search, setSearch] = useState("")
    // state se existir resultado dos movies na busca na API
    const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([])
    

    
    
    useEffect(() => {
        loadMoreData();
    }, [])
    
    // função de requisição de dados api
    const loadMoreData = async () => {
        setLoading(true)
        const response = await api.get("/movie/popular", {
            params: {
                page,
            },
        })
        // aqui criei a logica de scroll infinito
        // ao rolar scroll carregara novas paginas de filmes mantendo os ja carregados
        setDiscoveryMovies([...discoveryMovies, ...response.data.results])
        setPage(page +1)
        setLoading(false)
    }

    // função de buscar filmes pelo input
    const searchMovies = async (query: string) => {
        setLoading(true)
        const response = await api.get("/search/movie", {
            params: {
                query,
            },
        })    
        
        if(response.data.results.length === 0) {
            setNoResult(true)
        }else {
            setSearchResultMovies(response.data.results)
        }
        setLoading(false)
    }

    // função para passar a busca do input
    const handleSearch = (text: string) => {
        setSearch(text)
        if(text.length > 2) {
            searchMovies(text);
        }else {
            setSearchResultMovies([])
        }
    }

    //função de renderMovieItem
    const navigation = useNavigation()
    
    const renderMovieItem = ({item}: {item: Movie}) => (
        <CardMovies data={item} onPress={() => navigation.navigate("Details", {movieId: item.id}) }/>
    )

    const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;


    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
                <View style={styles.containerInput}>
                    <TextInput placeholderTextColor="#fff" placeholder="Buscar" style={styles.input} value={search} onChangeText={handleSearch}/>
                    {/* onchangetext= na alteração do texto passo a função */}
                    {/* no value colocamos o estado search inicial */}
                    <MagnifyingGlass color="#FFF" size={25} weight="light"/>                
                </View>
                {noResult && (
                    <Text style={styles.noResult}>
                        Nenhum Filme encontrado para "{search}"
                    </Text>
                )}
            </View>
            <View style={styles.flatList}>
                <FlatList
                    data={movieData}
                    //metodo para numero de colunas dos cards
                    numColumns={3} 
                    //renderiza o item
                    renderItem={renderMovieItem}
                    //desabilita o indicador vertival de rolagem
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 35,
                        paddingBottom: 100,
                    }}
                    // quando eu chegar no final da lista execute o loadmoredata
                    onEndReached={() => loadMoreData()}
                    // quando eu chegar 50% da lista ja faz nova requisição
                    onEndReachedThreshold={0.5}
                />
                {/* loading com spiner */}
                {loading && <ActivityIndicator size={50} color="#0296e5"/>}
            </View>

        </View>
    )

}