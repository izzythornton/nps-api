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
            <li><b>${responseJson.data[i].fullName}</b>
            <p>${responseJson.data[i].description}</p>
            <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p></li>
            `)};
    $("#results").removeClass("hidden");
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
        .catch(err => {
            $('#js-error-message').text(`Oops! We ran into a problem: ${err.message}`);
          });
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