import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    ScrollView,
    Image,
    Linking,
    TouchableOpacity
} from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { render } from "react-dom";
import { Rating, AirbnbRating } from 'react-native-ratings';

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: "justify",
    },
    content: {
        margin: 10,
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    itemText: {
        fontSize: 25,
        color: '#ad3939',
        paddingTop: 5,

    },
    itemTitle: {
        fontSize: 20,
        fontStyle: 'italic',
        paddingTop: 7,
        textAlign: "justify",
    },
    image: {
        width: '100%',
        height: '50%',
    },
    author: {
        fontSize: 20,
        fontStyle: 'italic',
        paddingTop: 3,
        color: '#e27c7c',
    },
    description: {
        fontSize: 20,
        textAlign: "justify",
        paddingTop: 10,
    },
    ContentStyle: {
        fontSize: 13,
        textAlign: "justify",
        paddingTop: 10, 

    },
    publisheddate: {
        fontSize: 15,
        color: '#8e8a8a',
        paddingTop: 10,

    },
    website: {
        color: '#7740f7',
        fontSize: 15,
        paddingTop: 8,
    },
    viewImage: {
        width: 200,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ad3939',

    },
    detailViewContainer: {
        padding: 10,
    }
});


const NewsViewScreen = ({navigation}) => {
    
    const [isLoading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch(
            "http://newsapi.org/v2/everything?q=bitcoin&from=2020-06-10&sortBy=publishedAt&apiKey=41fcfed73667443f8da04bdbc76bbd9b"
        )
            .then((res) => res.json())
            .then((json) => {
            setNews(json.articles);
            });
    }, []);

    return (
 
        <View style={styles.content}>
            <FlatList
                data={news}
                renderItem={({ item }) => (
                    <ScrollView style={styles.item}>
                        <TouchableOpacity onPress={() => navigation.navigate('NewsDetailView', item)}>
                            <Image source={{uri: item.urlToImage}} style={styles.viewImage} />
                            <Text style={styles.itemText}>
                                {item.source.name}
                            </Text>
                            <Text style={styles.itemTitle}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}
                keyExtractor={i => i.id}
            />
        </View>

    );
};


const NewsDetailViewScreen = ({navigation}) => {

    return(

        <ScrollView style={styles.detailViewContainer}>
            <Text style={styles.title}>{navigation.getParam('title')} </Text>
            <Text style={styles.author}>Written By:{navigation.getParam('author')}</Text>
            <Image source={{uri: navigation.getParam('urlToImage')}} style={styles.image}/>
            <Text style={styles.description}>{navigation.getParam('description')}</Text>
            <Text style={styles.ContentStyle}>{navigation.getParam('content')}</Text>
            <Text style={styles.publisheddate}>Published At : {navigation.getParam('publishedAt')}</Text>
            <Text style={styles.website} onPress={() => Linking.openURL(navigation.getParam('url'))}>Website Link</Text>
        </ScrollView>

    );
};


const AppNavigator = createStackNavigator(
  {
    NewsView: NewsViewScreen,
    NewsDetailView: NewsDetailViewScreen,
  },
  {
    initialRouteName: "NewsView",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}



