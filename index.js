/*
 * Sri Pranav Kunda
 * Compromise JS library demo with Prof. Kurz 
 * https://github.com/spencermountain/compromise
 * 
 * Also see:
 * https://github.com/ottokart/punctuator2
 * http://bark.phon.ioc.ee/punctuator
 */

'use strict';

// Extend necessary compromise libraries (https://github.com/spencermountain/compromise#extend)
nlp.extend(compromiseNumbers);
nlp.extend(compromiseDates);
nlp.extend(compromiseDates);
nlp.extend(compromiseAdjectives);

// Enable logging for compromise
nlp.verbose(true);

const fill = cont => {
    // NLP Data (https://github.com/spencermountain/compromise/#api)
    cont = cont || nlp("");
    const dat = {
        nouns: cont.nouns(),
        verbs: cont.verbs(),
        adjectives: cont.adjectives(),
        people: cont.people(),
        places: cont.places(),
        organizations: cont.organizations(),
        contractions_expanded: cont.contractions().expand().text(),
        numbers: cont.numbers(),
        dates: cont.dates().format('{month} {date-ordinal} {year}'),
        times: cont.times(),
        match_noun_adj_verb: cont.has("#Noun #Adjective #Verb"),
        match_custom: cont.has(document.getElementById('match_custom')?.value)
    } // Get the data using the compromise API


    // Fill table
    const table = document.getElementById("fill_table"); // Get the table element
    table.innerHTML = `<tr><th>Group</th><th>Values</th></tr>` // Default HTML heading row for table
    for (const d in dat) {
        dat[d] = typeof dat[d].out !== 'undefined' ? dat[d].out('array').join(', ') : dat[d]; // Format the data for HTML
        table.innerHTML += `<tr><td>${d}</td><td>${dat[d]}</td><tr>`; // Add to html
    }
};

document.querySelectorAll("input").forEach(e => {
    const input = document.getElementById("sentence_input");
    e.addEventListener("keyup", el => fill(nlp(input.value))); // Add event listener for keypress on the input in HTML
});

document.onreadystatechange = () => { if (document.readyState == 'interactive') fill(); } // When the document is ready, fill the table with empty values
