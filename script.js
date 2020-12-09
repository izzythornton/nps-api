'use strict';

const apiKey = "IbalV73RFmVKjLCxXCq2q3VmHaElRIikcai225yn";
const searchUrl = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join("&");
}

function displayResults(responseJson) {
    console.log(responseJson);
    $("#results-list").empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $("#results-list").append(`
            <li><h3>${responseJson.data[i].fullName}<h3>
            <p>${responseJson.data[i].description}</p>
            <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p></li>
            `)};
}

function getNationalParks(query, limit=10) {
    const params = {
        api_key: apiKey,
        q: query,
        limit,
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;

    console.log(url);

    fetch(url)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
}

function watchForm() {
    $("form").submit(event => {
        event.preventDefault();
        const searchTerm = $("#js-search-term").val();
        const limit = $("#js-max-results").val();
        getNationalParks(searchTerm, limit);
    });
}

$(watchForm);