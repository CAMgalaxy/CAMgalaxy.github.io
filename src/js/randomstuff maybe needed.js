
// add backslash if length > X
        if(newText.length > 10){
            let condsplit = 10;

            // split string in words
            const tmp_words = newText.split(' ');
            // cummlative length of every word and add escape character behind words > length X
            let tmp_words_length = tmp_words.map(w => w.length)
            const cumulativeSum = (sum => x => sum += x)(0);
            tmp_words_length = tmp_words_length.map(cumulativeSum);
      
            for(let i = 0; i < tmp_words.length; i++){
                if(tmp_words_length[i] >= condsplit){
                    tmp_words[i] = tmp_words[i] + "//";
                    condsplit += condsplit;
                }
            }
            newText = tmp_words.join(" ");
        }