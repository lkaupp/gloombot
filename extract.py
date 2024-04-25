import fitz
import os

from unidecode import unidecode

dir = os.listdir("documents",)
f = open("preprocessed/gh_summ.txt", "a", encoding="utf-8")
for file in dir:
	doc = fitz.open(f"documents/{file}")

	for page in doc:
		file_dict = page.get_text('dict')
		for block in file_dict['blocks']:
			if block['type'] == 0:
				for line in block['lines']:
					for span in line['spans']:
						text = unidecode(span['text'])
						f.writelines(text)
